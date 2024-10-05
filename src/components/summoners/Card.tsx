import Image from 'next/image';
import { LeagueMatchEntity, ParticipantDto } from '@/type/LeagueMatch';

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

export default function Card({ info, metadata }: LeagueMatchEntity) {
  const blueSide = getSide(info.participants, info.gameMode, TeamId.BLUESIDE);
  const redSide = getSide(info.participants, info.gameMode, TeamId.REDSIDE);

  return (
    <div className="flex flex-col items-center rounded-lg shadow md:flex-row md:max-w-xl w-full bg-white border border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      {/* <Image
        src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${me.championName}.png`}
        alt="Icon Profile"
        width={56}
        height={56}
        loading="lazy"
      /> */}
      <div className="flex flex-col w-full justify-between p-4 leading-normal">
        <div className="flex justify-between mb-4">
          <div>{info.gameMode}</div>
        </div>

        <div className="flex flex-row">
          <div className="flex flex-col justify-between">
            {blueSide.map((element, index) => {
              return (
                <div key={index}>
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${element.championName}.png`}
                    alt="Icon Profile"
                    width={56}
                    height={56}
                    loading="lazy"
                  />
                  <p className="mb-3 font-bold dark:text-gray-400">
                    {element.riotIdGameName}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col justify-between">
            {redSide.map((element, index) => {
              return (
                <p className="mb-3 font-bold dark:text-gray-400" key={index}>
                  {element.riotIdGameName}
                </p>
              );
            })}
          </div>
        </div>
        {/* <div className="flex flex-row">
          <div className="flex flex-col justify-between">
            <p className="mb-3 font-bold dark:text-gray-400">
              {info.gameMode === 'CLASSIC'
                ? info.participants.find(
                    (elem) =>
                      elem.teamPosition === 'TOP' &&
                      elem.teamId === TeamId.BLUESIDE,
                  )?.riotIdGameName
                : ''}
            </p>
            <p className="mb-3 font-bold dark:text-gray-400">
              {info.gameMode === 'CLASSIC'
                ? info.participants.find(
                    (elem) =>
                      elem.teamPosition === 'JUNGLE' &&
                      elem.teamId === TeamId.BLUESIDE,
                  )?.riotIdGameName
                : ''}
            </p>
            <p className="mb-3 font-bold dark:text-gray-400">
              {info.gameMode === 'CLASSIC'
                ? info.participants.find(
                    (elem) =>
                      elem.teamPosition === 'MIDDLE' &&
                      elem.teamId === TeamId.BLUESIDE,
                  )?.riotIdGameName
                : ''}
            </p>

            <p className="mb-3 font-bold dark:text-gray-400">
              {info.gameMode === 'CLASSIC'
                ? info.participants.find(
                    (elem) =>
                      elem.teamPosition === 'BOTTOM' &&
                      elem.teamId === TeamId.BLUESIDE,
                  )?.riotIdGameName
                : ''}
            </p>
            <p className="mb-3 font-bold dark:text-gray-400">
              {info.gameMode === 'CLASSIC'
                ? info.participants.find(
                    (elem) =>
                      elem.teamPosition === 'UTILITY' &&
                      elem.teamId === TeamId.BLUESIDE,
                  )?.riotIdGameName
                : ''}
            </p>
          </div>

          <div className="flex flex-col justify-between">
            <p className="mb-3 font-bold dark:text-gray-400">
              {info.gameMode === 'CLASSIC'
                ? info.participants.find(
                    (elem) =>
                      elem.teamPosition === 'TOP' &&
                      elem.teamId === TeamId.REDSIDE,
                  )?.riotIdGameName
                : ''}
            </p>
            <p className="mb-3 font-bold dark:text-gray-400">
              {info.gameMode === 'CLASSIC'
                ? info.participants.find(
                    (elem) =>
                      elem.teamPosition === 'JUNGLE' &&
                      elem.teamId === TeamId.REDSIDE,
                  )?.riotIdGameName
                : ''}
            </p>
            <p className="mb-3 font-bold dark:text-gray-400">
              {info.gameMode === 'CLASSIC'
                ? info.participants.find(
                    (elem) =>
                      elem.teamPosition === 'MIDDLE' &&
                      elem.teamId === TeamId.REDSIDE,
                  )?.riotIdGameName
                : ''}
            </p>

            <p className="mb-3 font-bold dark:text-gray-400">
              {info.gameMode === 'CLASSIC'
                ? info.participants.find(
                    (elem) =>
                      elem.teamPosition === 'BOTTOM' &&
                      elem.teamId === TeamId.REDSIDE,
                  )?.riotIdGameName
                : ''}
            </p>
            <p className="mb-3 font-bold dark:text-gray-400">
              {info.gameMode === 'CLASSIC'
                ? info.participants.find(
                    (elem) =>
                      elem.teamPosition === 'UTILITY' &&
                      elem.teamId === TeamId.REDSIDE,
                  )?.riotIdGameName
                : ''}
            </p>
          </div>
        </div> */}
        <div className="flex justify-between">
          <p className="mb-3 font-bold dark:text-gray-400"></p>
          <p className="mb-3 font-bold dark:text-gray-400"></p>
        </div>

        <p className="mb-3 font-bold dark:text-gray-400"></p>
      </div>
    </div>
  );
}
