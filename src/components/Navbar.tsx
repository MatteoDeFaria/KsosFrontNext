import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  return (
    <div className="w-full h-[65px] fixed px-10 shadow-lg bg-white dark:bg-gray-800">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto">
        <div>
          <Link className="font-bold" href={'/'}>
            KSOS
          </Link>
        </div>
        <div>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}
