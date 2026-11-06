import type { Game, GameParticipant, PlayerPerformance } from '~/types'

/**
 * Creates an array of ids of game participants from a game.
 *
 * @param participants The participant objects from a game
 */
export const getPlayerIds = (participants: GameParticipant[]): string[] =>
  participants.map((p) => p.playerId)

/**
 * Creates an array of performances of participants from a game.
 *
 * @param gameId The id of the game
 * @param game The game object
 */
export const toPerformances = (
  gameId: string,
  game: Pick<Game, 'matchId' | 'tournamentId' | 'winnerTeamId' | 'participants'>
): PlayerPerformance[] =>
  game.participants.map((p) => ({
    gameId,
    matchId: game.matchId,
    tournamentId: game.tournamentId,
    playerId: p.playerId,
    teamId: p.teamId,
    championId: p.championId,
    lane: p.lane,
    award: p.award,
    won: p.teamId === game.winnerTeamId
  }))
