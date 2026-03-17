'use client'
import { Globe, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NavBar () {
    const [isOpen,setIsOpen] = useState(false)
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
            <div className="container mx-auto px-4  h-16 flex items-center justify-between">
                {/* LOGO Section */}
                <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-blue-900">
                <Globe className="h-6 w-6"/>
                <span>DANALEM TRADE</span>
                </Link>


                {/* NAV Section */}
                <nav className="hidden md:flex items-center space-x-6  font-medium text-gray-600">
                    <Link href="/" className="hover:text-blue-900 transition-colors">HOME</Link>
                    <Link href="#about" className="hover:text-blue-900 transition-colors">ABOUT</Link>
                    <Link href="#contact" className="hover:text-blue-900 transition-colors">CONTACT</Link>
                    <Link href="#services" className="hover:text-blue-900 transition-colors">SERVICES</Link>
                </nav>


                {/* CTA Button */}
                <div className="hidden md:block">
                    <Link href="/login" className="bg-blue-900 text-white px-3 py-3 rounded-md  font-medium hover:bg-blue-800 transition-colors cursor-pointer">
                    Get Started
                    </Link>
                </div>
                {/* Mobile Menu Button */}
            <button
            className="md:hidden p-2 text-gray-600 cursor-pointer" 
            onClick={()=>setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            >
                {isOpen ? <X className="h-6 w-6"/>: <Menu className="h-6 w-6"/> }
            </button>

            </div>

            
            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden border-t bg-white p-4 space-y-4">
                    <Link href="/" className="block  font-medium text-gray-600 hover:text-blue-900">HOME</Link>
                    <Link href="#about" className="block  font-medium text-gray-600 hover:text-blue-900">ABOUT</Link>
                    <Link href="#contact" className="block  font-medium text-gray-600 hover:text-blue-900">CONTACT</Link>
                    <Link href="#services" className="block  font-medium text-gray-600 hover:text-blue-900">SERVICES</Link>
                    <Link href="/login" className="block w-full text-center text-white py-2 px-4 transition-colors bg-blue-900 rounded-md">GET STARTED</Link>
                </div>
            )}
        </header>
    )
}