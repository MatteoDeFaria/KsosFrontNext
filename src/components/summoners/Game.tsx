import { InfosDto, ParticipantDto } from '@/type/LeagueMatch';

enum IdTypeGame {
  'Ranked Solo' = 420,
  'Ranked Flex' = 440,
  'Aram' = 450,
  'Ultimate Spellbook' = 1400,
}

export default function Game({
  info,
  summoner,
}: {
  info: InfosDto;
  summoner: ParticipantDto;
}) {
  const timeSpendInGame: Date = new Date(
    new Date(info.gameEndTimestamp).valueOf() -
      new Date(info.gameStartTimestamp).valueOf(),
  );

  const gameType: string = IdTypeGame[info.queueId];

  return (
    <div className="flex flex-col font-bold dark:text-gray-400">
      <p>{gameType}</p>
      <p>{'-----'}</p>
      <p>{summoner.win ? 'Win' : 'Lose'}</p>
      <p>
        {timeSpendInGame.getMinutes() +
          ':' +
          timeSpendInGame.getSeconds().toString().padStart(2, '0')}
      </p>
    </div>
  );
}
