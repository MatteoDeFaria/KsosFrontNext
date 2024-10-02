import Image from 'next/image';
import LolLeaderboard from '@/type/LolTypes';
import Iron from '/public/Rank=Iron.png';
import Bronze from '/public/Rank=Bronze.png';
import Silver from '/public/Rank=Silver.png';
import Gold from '/public/Rank=Gold.png';
import Platinum from '/public/Rank=Platinum.png';
import Emerald from '/public/Rank=Emerald.png';
import Diamond from '/public/Rank=Diamond.png';
import Master from '/public/Rank=Master.png';
import GrandMaster from '/public/Rank=Grandmaster.png';
import Challenger from '/public/Rank=Challenger.png';

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
    Iron,
    Bronze,
    Silver,
    Gold,
    Platinum,
    Emerald,
    Diamond,
    Master,
    GrandMaster,
    Challenger,
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
    <div className="flex flex-col items-center rounded-lg shadow md:flex-row md:max-w-xl w-full bg-white border border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <Image
        src={image[emblem.indexOf(tier)]}
        alt="Rank emblem"
        width={192}
        height={192}
        priority
      />

      <div className="flex flex-col w-full justify-between p-4 leading-normal">
        <div className="flex justify-between mb-4">
          <a
            href={`https://www.op.gg/summoners/euw/${gameName}-${tagLine}`}
            target="_blank"
            rel="noreferrer"
            className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {gameName + '#' + tagLine}
          </a>
          <div>
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/14.17.1/img/profileicon/${profileIconId}.png`}
              alt="Icon Profile"
              width={56}
              height={56}
              loading="lazy"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <p className="mb-3 font-bold dark:text-gray-400">
            {tier.charAt(0) + tier.substring(1).toLowerCase() + ' ' + rank}
          </p>
          <p className="mb-3 font-bold dark:text-gray-400">
            {leaguePoints + ' LP'}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="mb-3 font-bold dark:text-gray-400">
            {wins + 'W ' + losses + 'L'}
          </p>
          <p className="mb-3 font-bold dark:text-gray-400">
            {wins + losses + (wins + losses > 1 ? '  Games' : ' Game')}
          </p>
        </div>

        <p className="mb-3 font-bold dark:text-gray-400">
          {'Win Rate ' + Math.floor((wins / (wins + losses)) * 100) + '%'}
        </p>
      </div>
    </div>
  );
}
