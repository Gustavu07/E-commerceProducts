"use client";

import { Menu, ShoppingCart, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4 gap-4">
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <Image 
            src="/shopify-icon.svg" 
            alt="Logo" 
            width={40} 
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
          <span className="hidden sm:block font-bold text-xl">Mi Tienda</span>
        </div>

        <div className="hidden lg:flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/products" className="hover:text-blue-600 transition-colors">
            Shop
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 pr-4"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="w-5 h-5" />
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-4 border-t">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 pr-4"
              autoFocus
            />
          </div>
        </div>
      )}
    </nav>
  );
}