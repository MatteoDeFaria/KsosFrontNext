import Image from 'next/image';

export default async function Spell({ summonerId }: { summonerId: string }) {
  const summonerSpellJson = await fetch(
    'https://ddragon.leagueoflegends.com/cdn/14.20.1/data/en_US/summoner.json',
  ).then((res) => res.json());

  const summonerSpellIconUrl: string =
    summonerSpellJson.data[
      Object.keys(summonerSpellJson.data).find(
        (elem) => summonerSpellJson.data[elem].key === summonerId,
      ) ?? summonerSpellJson.data[0]
    ].id;

  return (
    <div>
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_RIOT_DRAGON_VERSION}/img/spell/${summonerSpellIconUrl}.png`}
        alt="Icon Profile"
        width={30}
        height={30}
        loading="lazy"
      />
    </div>
  );
}
