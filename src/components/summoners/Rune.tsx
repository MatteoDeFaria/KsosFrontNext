import Image from 'next/image';
import { ParticipantDto } from '@/type/LeagueMatch';

interface RuneDto {
  summoner: ParticipantDto;
  style: string;
}

export default async function Rune({ summoner, style }: RuneDto) {
  const summonerRuneJson = await fetch(
    'https://ddragon.leagueoflegends.com/cdn/14.20.1/data/en_US/runesReforged.json',
  ).then((res) => res.json());

  const summonerRune = summoner.perks.styles.find(
    (elem) => elem.description === style,
  );

  if (!summonerRune) return <div></div>;

  const summonerRuneData = summonerRuneJson.find(
    (elem: { id: number }) => elem.id === summonerRune?.style,
  );

  const urlSummonerRuneIcon =
    summonerRune?.selections.length > 2
      ? summonerRuneData.slots[0].runes.find(
          (elem: { id: number }) =>
            elem.id === summonerRune?.selections[0].perk,
        ).icon
      : summonerRuneData.icon;

  return (
    <div>
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/img/${urlSummonerRuneIcon}`}
        alt="Rune Icon"
        width={30}
        height={30}
        loading="lazy"
      />
    </div>
  );
}
