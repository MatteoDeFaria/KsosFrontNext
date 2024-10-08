import Image from 'next/image';
import { InfosDto, MetaDataDto, ParticipantDto } from '@/type/LeagueMatch';

// enum GameMode {
//   ARAM = 120,
//   NORMAL = 450,
// }

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

export default function Card({ info, metadata, summoner }: CardTest) {
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

  return (
    <div className="flex flex-col items-center rounded-lg shadow md:flex-row md:max-w-xl w-full bg-white border border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div>
        <p>{info.gameMode}</p>
        <p>{'-----'}</p>
        <p>{summoner.win ? 'Win' : 'Lose'}</p>
        <p>
          {timeSpendInGame.getMinutes() + ':' + timeSpendInGame.getSeconds()}
        </p>
      </div>

      <div className="flex flex-col ">
        <p>{`${summoner.kills}/${summoner.deaths}/${summoner.assists}`}</p>
        <p>{`${kda} KDA`}</p>
      </div>

      <div className="flex flex-col w-full">
        <p>Item:</p>
        <div className="flex flex-row space-x-1">
          {itemList.map((element, index) => {
            if (!element) {
              return (
                <div key={index} className=" bg-slate-500 w-[30px] h-[30px]">
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

      <div className="flex flex-col w-full justify-between p-4 leading-normal">
        {/* <div className="flex justify-between mb-4">
          <div>{info.gameMode}</div>
        </div> */}

        <div className="flex flex-row space-x-1">
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
                  <p className="ml-2 font-bold dark:text-gray-400">
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
                  <p className="ml-2 font-bold dark:text-gray-400">
                    {element.riotIdGameName}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-between">
          <p className="mb-3 font-bold dark:text-gray-400"></p>
          <p className="mb-3 font-bold dark:text-gray-400"></p>
        </div>

        <p className="mb-3 font-bold dark:text-gray-400"></p>
      </div>
    </div>
  );
}
