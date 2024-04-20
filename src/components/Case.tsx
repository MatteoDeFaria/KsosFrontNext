import Image from 'next/image';
import { Suspense } from 'react';

type Data = {
  leagueId: string;
  queueType: string;
  rank: string;
  tier: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  gameName: string;
  tagLine: string;
};

export default async function Case() {
  const image = [
    '/Rank=Iron.png',
    '/Rank=Bronze.png',
    '/Rank=Silver.png',
    '/Rank=Gold.png',
    '/Rank=Platinum.png',
    '/Rank=Emerald.png',
    '/Rank=Diamond.png',
    '/Rank=Master.png',
    '/Rank=Grandmaster.png',
    '/Rank=Challenger.png',
  ];

  const emblem = [
    'IRON',
    'BRONZE',
    'SILVER',
    'GOLD',
    'PLATINUM',
    'EMERALD',
    'DIAMOND',
    'MASTER',
    'GRANDMASTER',
    'CHALLENGER',
  ];

  const res = await fetch(`https://api.ksos.me/lol/leaderboard`);
  const data: Data[] = await res.json();

  return (
    <Suspense fallback={'Loading ...'}>
      <div className='text-center pt-6'>
        <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          Leaderboard
        </h5>
      </div>

      <div className='p-4 py-12 grid grid-row gap-6 justify-items-center w-full'>
        {data.map((element, index) => {
          return (
            <div
              key={index}
              className='flex flex-col items-center rounded-lg shadow md:flex-row md:max-w-xl w-full bg-white border border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
            >
              <Image
                src={image[emblem.indexOf(element.tier)]}
                alt='Rank emblem'
                width={1000}
                height={1000}
                className='object-cover w-3/4 rounded-t-lg h-full md:h-auto md:w-48'
              />

              <div className='flex flex-col w-full justify-between p-4 leading-normal'>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                  {element.gameName + '#' + element.tagLine}
                </h5>
                <div className='flex justify-between'>
                  <p className='mb-3 font-bold dark:text-gray-400'>
                    {element.tier.charAt(0) +
                      element.tier.substring(1).toLowerCase() +
                      ' ' +
                      element.rank}
                  </p>
                  <p className='mb-3 font-bold dark:text-gray-400'>
                    {element.leaguePoints + ' LP'}
                  </p>
                </div>
                <p className='mb-3 font-bold dark:text-gray-400'>
                  {element.wins + 'W ' + element.losses + 'L'}
                </p>
                <p className='mb-3 font-bold dark:text-gray-400'>
                  {'Win Rate ' +
                    Math.floor(
                      (element.wins / (element.wins + element.losses)) * 100
                    ) +
                    '%'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Suspense>
  );
}
