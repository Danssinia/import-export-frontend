'use client'
import { Bell, Menu, Search } from "lucide-react";

interface TopBarProps {
    onMenuClick: () => void;
}

export default function TopBar({onMenuClick}: TopBarProps) {
    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8">
            <div className="flex items-center space-x-4">
                <button
                className="md:hidden text-gray-500 hover:text-gray-700"
                onClick={onMenuClick}
                >
                    <Menu className="h-6 w-6"/>
                </button>

                {/* Search Bar */}
                <div className="hidden md:flex items-center bg-gray-100 rounded-md px-3 py-2 w-64">
                    <Search className="h-4 w-4 text-gray-400"/>
                    <input type="text"
                    placeholder="Search shipments..."
                    className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-700"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-500 hover:text-gray-700">
                    <Bell className="h-5 w-5"/>
                    <span className="bg-red-500 absolute top-1 right-1 h-2 w-2 rounded-full"></span>
                </button>

                <div className="flex items-center space-x-2 border-l pl-4 border-gray-200">
                    <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-blue-900 font-bold">
                        DA
                    </div>
                    <div className="hidden md:block text-sm">
                        <p className="font-medium text-gray-700">Dan Alem</p>
                        <p className="text-xs text-gray-500">Logistics Manager</p>
                    </div>
                </div>
            </div>
        </header>
    )
}