'use client'

import SideBar from "../components/layout/SideBar";
import { useState } from "react";
import TopBar from "../components/layout/TopBar";

export default function DashboardLayout ({children,}:{children: React.ReactNode}) {
    const[sidebarOpen,setSideBarOpen] = useState(false)
    return (
        <div className="flex h-screen bg-gray-50">
            <SideBar isOpen={sidebarOpen} setIsOpen={setSideBarOpen}/>
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopBar onMenuClick={()=> setSideBarOpen(true)}/>
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}