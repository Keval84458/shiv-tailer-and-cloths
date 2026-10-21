import { PAGE_PATH_KEYS } from "#/utils/constant";
import { Link } from "@tanstack/react-router";

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800/80 shadow-md">
            <div className="h-0.5 bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4">
                <Link
                    to={PAGE_PATH_KEYS.HOME}
                    className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none"
                >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-tr from-purple-700 to-indigo-600 text-white font-serif text-xl sm:text-2xl font-black flex items-center justify-center rounded-xl shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform duration-200">
                        S
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-lg sm:text-2xl font-bold tracking-wider text-white uppercase font-sans leading-tight">
                            SHIV <span className="text-purple-400 font-light">TAILOR</span>
                        </h1>
                        <span className="text-[9px] sm:text-[10px] tracking-widest text-slate-400 uppercase">
                            Custom Fit • Handcrafted
                        </span>
                    </div>
                </Link>

            </div>
        </header>
    );
};

export default Header;