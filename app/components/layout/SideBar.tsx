'use client'
import { Import, LayoutDashboard, LogOut, Menu, Package, Settings, Ship } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


const navItems = [
    {name:"Overview", href:"/dashboard", icon: LayoutDashboard},
    {name:"All Shipments", href:"/dashboard/shipments", icon: Package},
    {name:"Imports", href:"/dashboard/imports", icon: Import},
    {name:"Exports", href:"/dashboard/exports", icon: Ship},
    {name:"Settings", href:"/dashboard/settings", icon: Settings},
    {name:"Products", href:"/dashboard/products", icon: Menu},
]

interface SidebarProps{
    isOpen: boolean;
    setIsOpen: (open:boolean) => void;
}
export default function SideBar ({isOpen,setIsOpen}:SidebarProps) {
    const pathname = usePathname()
    return(
        <>
        {/* Mobile Overlay */}
        {isOpen && (
            <div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={()=>setIsOpen(false)}
            />
            
        )}

        {/* Sidebar Container */}
        <aside className={`fixed top-0 left-0 z-30 h-full w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen ${isOpen? "translate-x-0" : "-translate-x-full"}`}>
            <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800">
                <span className="text-xl font-bold">DanAlem Trade</span>
                <button
                className="md:hidden text-slate-400 hover:text-white"
                onClick={()=>setIsOpen(false)}
                >
                    <Menu/>
                </button>
            </div>

            <nav className="p-4 space-y-1">
                {navItems.map((item)=>{
                    const Icon= item.icon;
                    const isActive = pathname === item.href;
                    return(
                        <Link 
                        key={item.name}
                        href={item.href}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive? 'bg-blue-600 text-white':"text-slate-400 hover:bg-slate-800 hover:text-white"}`}
                        >
                            <Icon className="h-5 w-5"/>
                            <span>{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="absolute bottom-0 w-full p-4 border-t border-slate-600">
                <button className="flex space-x-3 items-center px-4 py-3 w-full text-sm font-medium text-slate-400 hover:text-white cursor-pointer hover:bg-slate-800 rounded-lg transition-colors">
                    <LogOut className="h-5 w-5"/>
                    <span>Sign Out</span>
                </button>
            </div>
        </aside> 
        </>
    )
}