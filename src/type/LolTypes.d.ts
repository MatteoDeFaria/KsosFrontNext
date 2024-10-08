interface LolLeaderboard {
  leagueId: string;
  queueType: string;
  rank: string;
  tier: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  gameName: string;
  tagLine: string;
  profileIconId: number;
}

export default LolLeaderboard;
