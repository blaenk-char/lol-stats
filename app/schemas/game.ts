import z from 'zod'
import { MESSAGES } from '~/constants'
import type { FormDefaults } from '~/types'
import { awardSchema, idSchema, laneSchema } from '.'

const messages = MESSAGES.schema.game

export const gameParticipantSchema = z.object({
  playerId: idSchema,
  teamId: idSchema,
  championId: idSchema,
  lane: laneSchema,
  award: awardSchema
})

export const createGameSchema = z
  .object({
    matchId: idSchema,
    tournamentId: idSchema,
    gameNumber: z.number().int().min(1),
    blueTeamId: idSchema,
    redTeamId: idSchema,
    winnerTeamId: idSchema,
    participants: z.array(gameParticipantSchema).length(10, messages.participants)
  })
  .superRefine((game, ctx) => {
    const fail = (message: string, path: (string | number)[] = []) =>
      ctx.addIssue({ code: 'custom', message, path })

    const { blueTeamId, redTeamId, winnerTeamId, participants } = game

    // check if team different
    if (blueTeamId === redTeamId) {
      fail(messages.superRefine.differentTeam, ['redTeamId'])
    }

    // check if 10 players
    if (![blueTeamId, redTeamId].includes(winnerTeamId)) {
      fail(messages.superRefine.noWinnerTeam, ['winnerTeamId'])
    }

    // check if every player in a team
    participants.forEach((p, i) => {
      if (![blueTeamId, redTeamId].includes(p.teamId)) {
        fail(messages.superRefine.playerNoTeam, ['participants', i, 'teamId'])
      }
    })

    for (const teamId of [blueTeamId, redTeamId]) {
      // check if 5 players per team
      const team = participants.filter((p) => p.teamId === teamId)
      if (team.length !== 5) {
        fail(messages.superRefine.fivePlayers(teamId, team.length), ['participants'])
      }

      // check if 5 different lanes per team
      if (new Set(team.map((p) => p.lane)).size !== team.length) {
        fail(messages.superRefine.fiveLanes(teamId), ['participants'])
      }
    }

    // check if player unique
    const playerIds = participants.map((p) => p.playerId)
    if (new Set(playerIds).size !== playerIds.length) {
      fail(messages.superRefine.playerUnique, ['participants'])
    }

    const mvps = participants.filter((p) => p.award === 'mvp')
    const svps = participants.filter((p) => p.award === 'svp')

    // check if 1 mvp
    if (mvps.length !== 1) {
      fail(messages.superRefine.mvpUnique(mvps.length), ['participants'])

      // check if mvp winner
    } else if (mvps[0]?.teamId !== winnerTeamId) {
      fail(messages.superRefine.mvpWinner, ['participants'])
    }

    // check if 1 svp
    if (svps.length !== 1) {
      fail(messages.superRefine.svpUnique(svps.length), ['participants'])

      // check if svp loser
    } else if (svps[0]?.teamId === winnerTeamId) {
      fail(messages.superRefine.svpLoser, ['participants'])
    }
  })

export type CreateGameOSchema = z.output<typeof createGameSchema>

export const createGameOState: FormDefaults<CreateGameOSchema> = {
  matchId: undefined,
  tournamentId: undefined,
  gameNumber: undefined,
  blueTeamId: undefined,
  redTeamId: undefined,
  winnerTeamId: undefined,
  participants: []
}
