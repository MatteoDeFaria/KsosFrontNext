import Image from 'next/image';
import { InfosDto, MetaDataDto, ParticipantDto } from '@/type/LeagueMatch';

enum TeamId {
  BLUESIDE = 100,
  REDSIDE = 200,
}

enum POSITION {
  'TOP',
  'JUNGLE',
  'MIDDLE',
  'BOTTOM',
  'UTILITY',
}

function getPosition(participants: ParticipantDto[]): ParticipantDto[] {
  const tmpParticipant: ParticipantDto[] = participants;
  tmpParticipant.sort(
    (a, b) =>
      Object.values(POSITION).indexOf(a.teamPosition) -
      Object.values(POSITION).indexOf(b.teamPosition),
  );

  return tmpParticipant;
}

function getSide(
  participants: ParticipantDto[],
  gameMode: string,
  side: TeamId,
): ParticipantDto[] {
  let team: ParticipantDto[] = [];

  participants.forEach((element) => {
    if (element.teamId === side) team.push(element);
  });

  if (gameMode === 'CLASSIC') team = getPosition(team);

  return team;
}

interface CardTest {
  info: InfosDto;
  metadata: MetaDataDto;
  summoner: ParticipantDto;
}

export default async function Card({ info, metadata, summoner }: CardTest) {
  const blueSide = getSide(info.participants, info.gameMode, TeamId.BLUESIDE);
  const redSide = getSide(info.participants, info.gameMode, TeamId.REDSIDE);

  const timeSpendInGame: Date = new Date(
    new Date(info.gameEndTimestamp).valueOf() -
      new Date(info.gameStartTimestamp).valueOf(),
  );

  const kda: string = Number(
    ((summoner.kills + summoner.assists) / summoner.deaths).toFixed(2),
  ).toString(); // round up to 2 number after the comma.

  const itemList: number[] = [
    summoner.item0,
    summoner.item1,
    summoner.item2,
    summoner.item3,
    summoner.item4,
    summoner.item5,
    summoner.item6,
  ];

  const summonerSpellJson = await fetch(
    'https://ddragon.leagueoflegends.com/cdn/14.20.1/data/en_US/summoner.json',
  ).then((res) => res.json());

  const summonerSpell1Data: string =
    Object.keys(summonerSpellJson.data).find(
      (elem) =>
        summonerSpellJson.data[elem].key === summoner.summoner1Id.toString(),
    ) ?? summonerSpellJson.data[0];

  const summonerSpell2Data: string =
    Object.keys(summonerSpellJson.data).find(
      (elem) =>
        summonerSpellJson.data[elem].key === summoner.summoner2Id.toString(),
    ) ?? summonerSpellJson.data[0];

  const summonerRuneJson = await fetch(
    'https://ddragon.leagueoflegends.com/cdn/14.20.1/data/en_US/runesReforged.json',
  ).then((res) => res.json());

  const summonerRune1 = summoner.perks.styles.find(
    (elem) => elem.description === 'primaryStyle',
  );

  const summonerRune2 = summoner.perks.styles.find(
    (elem) => elem.description === 'subStyle',
  );

  const summonerRune1Data = summonerRuneJson.find(
    (elem: { id: number }) => elem.id === summonerRune1?.style,
  );

  const urlSummonerRune1Icon = summonerRune1Data.slots[0].runes.find(
    (elem: { id: number }) => elem.id === summonerRune1?.selections[0].perk,
  ).icon;

  const urlSummonerRune2Icon = summonerRuneJson.find(
    (elem: { id: number }) => elem.id === summonerRune2?.style,
  ).icon;

  return (
    <div className="flex flex-col rounded-lg shadow md:flex-row md:max-w-xl w-full lg:max-w-screen-md bg-white border border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div className="flex flex-col lg:w-1/4 md:w-full">
        <p>{info.gameMode}</p>
        <p>{'-----'}</p>
        <p>{summoner.win ? 'Win' : 'Lose'}</p>
        <p>
          {timeSpendInGame.getMinutes() + ':' + timeSpendInGame.getSeconds()}
        </p>
      </div>

      <div className="flex flex-col lg:w-2/4 md:w-full">
        <div className="flex flex-row">
          <div>
            <Image
              className="rounded-full"
              src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${summoner.championName}.png`}
              alt="Icon Profile"
              width={60}
              height={60}
              loading="lazy"
            />
          </div>
          <div>
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/spell/${summonerSpellJson.data[summonerSpell1Data].id}.png`}
              alt="Icon Profile"
              width={30}
              height={30}
              loading="lazy"
            />
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/spell/${summonerSpellJson.data[summonerSpell2Data].id}.png`}
              alt="Icon Profile"
              width={30}
              height={30}
              loading="lazy"
            />
          </div>
          <div>
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/img/${urlSummonerRune1Icon}`}
              alt="Icon Profile"
              width={30}
              height={30}
              loading="lazy"
            />
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/img/${urlSummonerRune2Icon}`}
              alt="Icon Profile"
              width={30}
              height={30}
              loading="lazy"
            />
          </div>
          <div className="flex flex-col">
            <p>{summoner.champLevel}</p>
            <p>{`${summoner.kills}/${summoner.deaths}/${summoner.assists}`}</p>
            <p>{`${kda} KDA`}</p>
          </div>
        </div>
        <p>Item:</p>
        <div className="flex flex-row space-x-1">
          {itemList.map((element, index) => {
            if (!element) {
              return (
                <div key={index} className=" bg-gray-400 w-[30px] h-[30px]">
                  <div className="grow"> </div>
                </div>
              );
            }
            return (
              <div key={index}>
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/item/${element}.png`}
                  alt="Icon Profile"
                  width={30}
                  height={30}
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:w-2/6 md:w-full">
        <div className="flex flex-col justify-between text-left">
          {blueSide.map((element, index) => {
            return (
              <div className="flex flex-row items-center" key={index}>
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${element.championName}.png`}
                  alt="Icon Profile"
                  width={30}
                  height={30}
                  loading="lazy"
                />
                <p className="ml-2 font-bold dark:text-gray-400 text-sm truncate ...">
                  {element.riotIdGameName}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col justify-between text-left">
          {redSide.map((element, index) => {
            return (
              <div className="flex flex-row items-center" key={index}>
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${element.championName === 'FiddleSticks' ? 'Fiddlesticks' : element.championName}.png`}
                  alt="Icon Profile"
                  width={30}
                  height={30}
                  loading="lazy"
                />
                <p className="ml-2 font-bold dark:text-gray-400 text-sm truncate ...">
                  {element.riotIdGameName}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
