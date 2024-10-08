import { Suspense } from 'react';
import api from '@/utils/api';
import { LeagueMatchEntity, ParticipantDto } from '@/type/LeagueMatch';
import Card from '@/components/summoners/Card';

interface ArrayLeagueMatchEntity {
  dataArray: LeagueMatchEntity[];
  summonerName: string;
}

function getSummoner(
  data: LeagueMatchEntity,
  summonerName: string,
): ParticipantDto {
  const summoner: ParticipantDto =
    data.info.participants.find(
      (element) => element.riotIdGameName === summonerName,
    ) ?? data.info.participants[0];

  return summoner;
}

function TestCard({ dataArray, summonerName }: ArrayLeagueMatchEntity) {
  const realSummonerName: string = summonerName.split('-')[0];

  return dataArray.map((element: LeagueMatchEntity, index: number) => {
    const summoner: ParticipantDto = getSummoner(element, realSummonerName);

    return (
      <Card
        key={index}
        info={element.info}
        metadata={element.metadata}
        summoner={summoner}
      />
    );
  });
}

export default async function Page({ params }: { params: { slug: string } }) {
  const matches: LeagueMatchEntity[] = await api.getMatches(params.slug);
  return (
    <Suspense fallback={'Loading ...'}>
      <div className="min-h-screen bg-white dark:bg-gray-800">
        <div className="text-center pt-20">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {params.slug}
          </h5>

          <div className="p-4 py-12 grid grid-row gap-6 justify-items-center w-full">
            <TestCard dataArray={matches} summonerName={params.slug} />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
