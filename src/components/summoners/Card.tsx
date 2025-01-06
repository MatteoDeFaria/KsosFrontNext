import Image from 'next/image';
import { InfosDto, ParticipantDto } from '@/type/LeagueMatch';
import Team from './Team';
import Item from './Item';
import Rune from './Rune';
import Spell from './Spell';
import Game from './Game';

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

export default async function Card({
  info,
  summoner,
}: {
  info: InfosDto;
  summoner: ParticipantDto;
}) {
  const blueSide = getSide(info.participants, info.gameMode, TeamId.BLUESIDE);
  const redSide = getSide(info.participants, info.gameMode, TeamId.REDSIDE);
  const bgColor = summoner.win
    ? 'bg-blue-200 border-blue-300 hover:bg-blue-300 dark:border-winner-card-hover dark:bg-winner-card dark:hover:bg-winner-card-hover'
    : 'bg-rose-200 border-rose-300 hover:bg-rose-300 dark:border-looser-card-hover dark:bg-looser-card dark:hover:bg-looser-card-hover';

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
    <div
      className={`flex flex-col rounded-lg shadow md:flex-row md:max-w-xl w-full lg:max-w-screen-md items-center border ${bgColor}`}
    >
      <div className="lg:w-1/6 md:w-full p-4">
        <Game info={info} summoner={summoner} />
      </div>

      <div className="flex flex-col lg:w-2/4 md:w-full p-4">
        <div className="flex flex-row">
          <div>
            <Image
              className="rounded-full"
              src={`https://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_RIOT_DRAGON_VERSION}/img/champion/${summoner.championName}.png`}
              alt="Icon Profile"
              width={60}
              height={60}
              loading="lazy"
            />
          </div>
          <div className="pl-5">
            <Spell summonerId={summoner.summoner1Id.toString()} />
            <Spell summonerId={summoner.summoner2Id.toString()} />
          </div>

          <div>
            <Rune summoner={summoner} style={'primaryStyle'} />
            <Rune summoner={summoner} style={'subStyle'} />
          </div>

          <div className="flex flex-col text-left font-bold pl-5 dark:text-gray-400">
            <p>{`${summoner.kills}/${summoner.deaths}/${summoner.assists}`}</p>
            <p>{`${kda} KDA`}</p>
          </div>
        </div>

        <div className="pt-5">
          <Item itemList={itemList} />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:w-2/5 md:w-full p-4">
        <div className="flex flex-col justify-between text-left">
          {blueSide.map((element: ParticipantDto, index) => {
            return <Team key={index} summoner={element} />;
          })}
        </div>

        <div className="flex flex-col justify-between text-left">
          {redSide.map((element, index) => {
            return <Team key={index} summoner={element} />;
          })}
        </div>
      </div>
    </div>
  );
}
