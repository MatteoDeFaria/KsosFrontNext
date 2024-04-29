import axios from 'axios';
import LolLeaderboard from '@/type/LolTypes';
const backendUrl =
  process.env.NEXT_PUBLIC_KSOS_API_URL || 'http://localhost:3000/';

class Api {
  private instance: any;

  constructor() {
    this.instance = axios.create({
      baseURL: backendUrl,
      timeout: 3000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getLeaderboard = (queueType: string) =>
    this.instance
      .get(`/lol/leaderboard/${queueType}`)
      .then((res: { data: LolLeaderboard[] }) => res.data);
}

const api = new Api();

export default api;
