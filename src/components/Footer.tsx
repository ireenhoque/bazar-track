const Footer = () => {
    return (
        <footer className="w-full border-t border-gray-100 bg-white">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-center sm:px-6 sm:py-6 md:flex-row md:text-left lg:px-8">
                
                {/* Left */}
                <p className="text-[10px] text-gray-700 sm:text-xs">
                    বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>

                {/* Right */}
                <p className="text-[9px] leading-4 text-gray-500 sm:text-[10px] md:text-right">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                </p>

            </div>
        </footer>
    );
};

export default Footer;