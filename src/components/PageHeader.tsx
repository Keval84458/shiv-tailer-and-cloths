import { Link } from "@tanstack/react-router";
import { FaChevronLeft } from "react-icons/fa6";

interface PageHeaderProps {
    title: string;
    onBack?: string;
}

const PageHeader = ({ title, onBack }: PageHeaderProps) => {
    return (
        <div className="bg-white border-b border-gray-100 py-3 px-4 shadow-sm w-full fixed top-[4rem] left-0 z-10">
            <div className="max-w-7xl mx-auto flex items-center relative justify-center sm:justify-start">
                <Link to={onBack} className="absolute left-0 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <FaChevronLeft />
                </Link>

                <h1 className="text-xl font-semibold text-gray-800 sm:ml-10">
                    {title}
                </h1>
            </div>
        </div>
    );
};

export default PageHeader;