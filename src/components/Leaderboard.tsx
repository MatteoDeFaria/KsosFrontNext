'use client';

import { useEffect, useState, Suspense } from 'react';
import api from '@/utils/api';
import LolLeaderboard from '@/type/LolTypes';
import Case from './Case';

enum TypeQueue {
  'RANKED_SOLO_5x5',
  'RANKED_FLEX_SR',
}

export default function Leaderboard() {
  const [soloQueue, setSoloQueue] = useState<LolLeaderboard[]>([]);
  const [flexQueue, setFlexQueue] = useState<LolLeaderboard[]>([]);
  const [typeQueue, setTypeQueue] = useState<TypeQueue>(
    TypeQueue.RANKED_SOLO_5x5
  );

  useEffect(() => {
    const fetchSoloQueue = async () => {
      try {
        const response = await api.getLeaderboard('RANKED_SOLO_5x5');
        setSoloQueue(response);
      } catch (e) {
        console.error(e);
      }
    };

    const fetchFlexQueue = async () => {
      try {
        const response = await api.getLeaderboard('RANKED_FLEX_SR');
        setFlexQueue(response);
      } catch (e) {
        console.error(e);
      }
    };

    fetchSoloQueue();
    fetchFlexQueue();
  }, []);

  return (
    <Suspense fallback={'Loading ...'}>
      <div className='text-center pt-20'>
        <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          Leaderboard
        </h5>
      </div>

      <div
        className=' rounded-md shadow-sm text-center align-middle pt-20'
        role='group'
      >
        <button
          type='button'
          className='px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700'
          onClick={() => setTypeQueue(TypeQueue.RANKED_SOLO_5x5)}
        >
          Solo Queue
        </button>
        <button
          type='button'
          className='px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700'
          onClick={() => setTypeQueue(TypeQueue.RANKED_FLEX_SR)}
        >
          Flex Queue
        </button>
        <button
          type='button'
          className='px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700'
        >
          TFT
        </button>
      </div>

      <div className='p-4 py-12 grid grid-row gap-6 justify-items-center w-full'>
        {typeQueue === TypeQueue.RANKED_SOLO_5x5
          ? soloQueue.map((element, index) => {
              return (
                <Case
                  key={index}
                  gameName={element.gameName}
                  leagueId={element.leagueId}
                  leaguePoints={element.leaguePoints}
                  losses={element.losses}
                  queueType={element.queueType}
                  rank={element.rank}
                  tagLine={element.tagLine}
                  tier={element.tier}
                  wins={element.wins}
                />
              );
            })
          : flexQueue.map((element, index) => {
              return (
                <Case
                  key={index}
                  gameName={element.gameName}
                  leagueId={element.leagueId}
                  leaguePoints={element.leaguePoints}
                  losses={element.losses}
                  queueType={element.queueType}
                  rank={element.rank}
                  tagLine={element.tagLine}
                  tier={element.tier}
                  wins={element.wins}
                />
              );
            })}
      </div>
    </Suspense>
  );
}
