
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import HeaderDate from "./HeaderDate";
import AuthControls from "./AuthControls";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-100 bg-white">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 sm:gap-3"
          aria-label="বাজার দর হোম পেজ"
        >
          <Image
            src="/logo-icon.png"
            alt="বাজার দর"
            width={50}
            height={50}
            className="h-8 w-8 shrink-0 rounded-md bg-green-700 p-1.5 sm:h-10 sm:w-10 sm:p-2"
            priority
          />

          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold leading-tight text-gray-900 sm:text-lg">
              বাজার দর
            </h1>
            <HeaderDate />
          </div>
        </Link>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4 md:gap-5">
          <AuthControls />
        </div>
      </div>

      <NavLinks />
    </header>
  );
}