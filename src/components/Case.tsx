import Image from 'next/image';
import LolLeaderboard from '@/type/LolTypes';

export default function Case({
  gameName,
  leaguePoints,
  losses,
  rank,
  tagLine,
  tier,
  wins,
  profileIconId,
}: LolLeaderboard) {
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

  return (
    <div className='flex flex-col items-center rounded-lg shadow md:flex-row md:max-w-xl w-full bg-white border border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
      <Image
        src={image[emblem.indexOf(tier)]}
        alt='Rank emblem'
        width={1000}
        height={1000}
        priority
        className='object-cover w-3/4 rounded-t-lg h-full md:h-auto md:w-48'
      />

      <div className='flex flex-col w-full justify-between p-4 leading-normal'>
        <div className='flex justify-between mb-4'>
          <a
            href={`https://www.op.gg/summoners/euw/${gameName}-${tagLine}`}
            target='_blank'
            rel='noreferrer'
            className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'
          >
            {gameName + '#' + tagLine}
          </a>
          <div className='max-w-14 max-h-14'>
            <Image
              loader={() => `https://ddragon.leagueoflegends.com/cdn/14.17.1/img/profileicon/${profileIconId}.png`}
              src={`https://ddragon.leagueoflegends.com/cdn/14.17.1/img/profileicon/${profileIconId}.png`}
              alt='Rank emblem'
              width={1000}
              height={1000}
              priority
            />
          </div>
        </div>

        <div className='flex justify-between'>
          <p className='mb-3 font-bold dark:text-gray-400'>
            {tier.charAt(0) + tier.substring(1).toLowerCase() + ' ' + rank}
          </p>
          <p className='mb-3 font-bold dark:text-gray-400'>
            {leaguePoints + ' LP'}
          </p>
        </div>

        <div className='flex justify-between'>
          <p className='mb-3 font-bold dark:text-gray-400'>
            {wins + 'W ' + losses + 'L'}
          </p>
          <p className='mb-3 font-bold dark:text-gray-400'>
            {wins + losses + (wins + losses > 1 ? '  Games' : ' Game')}
          </p>
        </div>

        <p className='mb-3 font-bold dark:text-gray-400'>
          {'Win Rate ' + Math.floor((wins / (wins + losses)) * 100) + '%'}
        </p>
      </div>
    </div>
  );
}
