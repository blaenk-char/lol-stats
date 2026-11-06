/**
 * Message constants for user feedback.
 */
export const MESSAGES = {
  // Schema
  schema: {
    // Common
    common: {
      id: 'ID is required',
      name: 'Name is required',
      uniqueIds: {
        min: (min: number, label: string) => `${label} needs at least ${min}`,
        refine: (label: string) => `${label} contains duplicates`
      }
    },

    // Game
    game: {
      participants: 'A game needs exactly 10 participants',
      superRefine: {
        differentTeam: 'Blue and red team must be different',
        fiveLanes: (teamId: string) => `Team ${teamId} has duplicate lanes`,
        fivePlayers: (teamId: string, length: number) =>
          `Team ${teamId} has ${length} players, expected 5`,
        mvpUnique: (length: number) => `Expected exactly 1 MVP, got ${length}`,
        mvpWinner: 'MVP must be on the winning team',
        noWinnerTeam: 'One team needs to be the winner team',
        playerNoTeam: 'Participant is not on either team',
        playerUnique: 'A player appears more than once',
        svpLoser: 'SVP must be on the losing team',
        svpUnique: (length: number) => `Expected exactly 1 SVP, got ${length}`
      }
    },

    // Match
    match: {
      refine: 'A match needs two different teams'
    }
  }
}
