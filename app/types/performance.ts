import type { Award, Lane } from '.'

export interface PlayerPerformance {
  gameId: string
  matchId: string
  tournamentId: string
  playerId: string
  teamId: string
  championId: string
  lane: Lane
  award: Award
  won: boolean
}
