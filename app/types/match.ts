export interface Match {
  name: string
  tournamentId: string
  teamIds: [string, string]
  winnerTeamId: string | null
  loserTeamId: string | null
  gameIds: string[]
}
