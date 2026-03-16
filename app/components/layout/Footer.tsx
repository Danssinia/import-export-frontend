import { Globe, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-white">
                        <Globe className="h-6 w-6"/>
                        <span>DANALEM TRADE</span>
                        </Link>
                        <p className="text-sm text-gray-400">
                            Simplifying global trade with seamless import and export solutions for businesses of all sizes.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-white transition-colors">HOME</Link></li>
                            <li><Link href="#about" className="hover:text-white transition-colors">ABOUT</Link></li>
                            <li><Link href="#contact" className="hover:text-white transition-colors">CONTACT</Link></li>
                            <li><Link href="#services" className="hover:text-white transition-colors">SERVICES</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}

                    <div>
                        <h3 className="text-white font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#terms" className="hover:text-white transition-colors">Terms of Serivce</Link></li>
                            <li><Link href="#cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}

                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center space-x-2">
                                <Mail className="h-6 w-6"/>
                                <span>info@danalem.com</span>
                            </li>

                            <li className="flex items-center space-x-2">
                                <Phone className="h-6 w-6"/>
                                <span>+251 912345678</span>
                            </li>

                            <li className="flex items-center space-x-2">
                                <MapPin className="h-6 w-6"/>
                                <span>Addis Ababa, Ethiopia</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} DANALEM Inc. All rights reserved</p>
                </div>
            </div>
        </footer>
    )
}