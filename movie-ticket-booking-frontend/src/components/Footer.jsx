import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between">
                {/* Brand */}
                <div className="mb-8 md:mb-0">
                    <h2 className="text-2xl font-bold text-pink-500 mb-2">CineWorld</h2>
                    <p className="text-gray-400 max-w-xs">
                        Your go-to site for the latest movies, deals, and tickets.
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="mb-8 md:mb-0 grid grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-white font-semibold mb-4">Explore</h3>
                        <ul>
                            <li className="mb-2 hover:text-pink-500 cursor-pointer">Home</li>
                            <li className="mb-2 hover:text-pink-500 cursor-pointer">Movies</li>
                            <li className="mb-2 hover:text-pink-500 cursor-pointer">Locations</li>
                            <li className="mb-2 hover:text-pink-500 cursor-pointer">Deals & Exclusives</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Support</h3>
                        <ul>
                            <li className="mb-2 hover:text-pink-500 cursor-pointer">Book Now</li>
                            <li className="mb-2 hover:text-pink-500 cursor-pointer">Login</li>
                            <li className="mb-2 hover:text-pink-500 cursor-pointer">Contact Us</li>
                            <li className="mb-2 hover:text-pink-500 cursor-pointer">FAQs</li>
                        </ul>
                    </div>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-6">
                        <a href="#" aria-label="Facebook" className="hover:text-pink-500">
                            <Facebook size={24} />
                        </a>
                        <a href="#" aria-label="Twitter" className="hover:text-pink-500">
                            <Twitter size={24} />
                        </a>
                        <a href="#" aria-label="Instagram" className="hover:text-pink-500">
                            <Instagram size={24} />
                        </a>
                        <a href="#" aria-label="LinkedIn" className="hover:text-pink-500">
                            <Linkedin size={24} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} CineWorld. All rights reserved.
            </div>
        </footer>
    );
}
