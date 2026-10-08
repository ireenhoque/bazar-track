import Image from "next/image";
import NavLinks from "./NavLinks";
import HeaderDate from "./HeaderDate";

const Header = () => {
    return (
        <header className="w-full border-b border-gray-100 bg-white">
            <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 py-3 sm:px-6 sm:py-4 lg:px-8">

                {/* Logo + Website Information */}
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                    <Image
                        src="/logo-icon.png"
                        alt="বাজার দর"
                        width={50}
                        height={50}
                        className="h-8 w-8 shrink-0 rounded-md bg-green-700 p-1.5 sm:h-10 sm:w-10 sm:p-2"
                    />

                    <div className="min-w-0">
                        <h1 className="truncate text-sm font-bold leading-tight sm:text-lg">
                            বাজার দর
                        </h1>

                        <HeaderDate />
                    </div>
                </div>

                {/* Authentication */}
                <div className="flex shrink-0 items-center gap-2 sm:gap-4 md:gap-5">
                    <button
                        className="whitespace-nowrap px-0 py-2 text-[11px] font-semibold text-gray-800 hover:text-green-700 sm:text-[13px]"
                    >
                        সাইন ইন
                    </button>

                    <button
                        className="whitespace-nowrap rounded-lg bg-green-700 px-3 py-1.5 text-[11px] font-semibold text-white shadow-md transition hover:bg-green-800 sm:px-4 sm:py-2 sm:text-[13px]"
                    >
                        সাইন আপ
                    </button>
                </div>

            </div>

            <NavLinks/>
        </header>
    );
};

export default Header;