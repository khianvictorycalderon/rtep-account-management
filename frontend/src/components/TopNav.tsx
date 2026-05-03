import { TOPNAV_HEADER } from "../constants";

type Props = {
    onMenuClick: () => void;
};

export default function TopNav({ onMenuClick }: Props) {

    return (
        <nav className="h-14 flex items-center px-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">

            {/* Hamburger (mobile only) */}
            <button
                onClick={onMenuClick}
                className="md:hidden p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800"
                aria-label="Open sidebar"
            >
                <svg
                    className="w-6 h-6 text-zinc-900 dark:text-zinc-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            <div className="ml-2 font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                {TOPNAV_HEADER}
            </div>

        </nav>
    );
}