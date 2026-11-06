import type { Award, Lane } from '.'

export interface GameParticipant {
  playerId: string
  teamId: string
  championId: string
  lane: Lane
  award: Award
}

export interface Game {
  matchId: string
  tournamentId: string
  gameNumber: number
  blueTeamId: string
  redTeamId: string
  winnerTeamId: string
  participants: GameParticipant[]
  playerIds: string[]
}
