import Image from 'next/image';
import { ParticipantDto } from '@/type/LeagueMatch';

export default function Team({ summoner }: { summoner: ParticipantDto }) {
  return (
    <div className="flex flex-row items-center">
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${summoner.championName === 'FiddleSticks' ? 'Fiddlesticks' : summoner.championName}.png`}
        alt="Icon Profile"
        width={30}
        height={30}
        loading="lazy"
      />
      <p className="ml-2 font-bold dark:text-gray-400 text-sm truncate ...">
        {summoner.riotIdGameName}
      </p>
    </div>
  );
}
