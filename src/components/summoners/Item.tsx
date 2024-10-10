import Image from 'next/image';

export default function Item({ itemList }: { itemList: number[] }) {
  return (
    <div>
      <div className="flex flex-row space-x-1">
        {itemList.map((element, index) => {
          if (!element) {
            return (
              <div
                key={index}
                className=" bg-gray-400 w-[30px] h-[30px] rounded-lg"
              >
                <div className="grow"> </div>
              </div>
            );
          }
          return (
            <div key={index}>
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/item/${element}.png`}
                alt="Item Icon"
                width={30}
                height={30}
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
