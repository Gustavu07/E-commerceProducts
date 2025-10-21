"use client";

import { Menu, ShoppingCart, User, Search, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  DropdownMenu,  DropdownMenuContent,  DropdownMenuItem,  DropdownMenuSeparator,  DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart} from "@/contexts/CartContext";
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () =>  setIsMobileMenuOpen(false);

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4 gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image
            src="/shopify-icon.svg"
            alt="Logo"
            width={40}
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
          <span className="hidden sm:block font-bold text-xl">TiendaMax</span>
        </Link>
        </div>

        <div className="hidden lg:flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/productos" className="hover:text-blue-600 transition-colors">
            Tienda
          </Link>
          <Link href="/" className="hover:text-blue-600 transition-colors">
            About Us
          </Link>
          <a
            href="#contact" 
            onClick={scrollToContact}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          > Contact </a>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="search"
              placeholder="Buscar productos..."
              className="pl-10 pr-4"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/carrito">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          <Link href="/favoritos" className="hidden md:block">
            <Button variant="ghost" size="icon">
              <Heart className="w-5 h-5" />
            </Button>
          </Link>

          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuSeparator />
                <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t bg-white shadow-inner">
          <div className="flex flex-col px-6 py-4">
            <div className="mb-4 pb-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Buscar productos..."
                  className="pl-10 pr-4"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-4 text-sm font-medium mb-4 pb-4 border-b">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/productos"
                onClick={closeMobileMenu}
                className="hover:text-blue-600 transition-colors"
              >
                Tienda
              </Link>
              <Link
                href="/about"
                onClick={closeMobileMenu}
                className="hover:text-blue-600 transition-colors"
              >
                About Us
              </Link>
              <a
                href="#contact"
                onClick={scrollToContact}
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                Contact
              </a>
            </div>

            <div className="flex flex-col space-y-3">
              <Link
                href="/favoritos"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                <Heart className="w-5 h-5" />
                <span>Favoritos</span>
              </Link>
              <Link
                href="/perfil"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                <User className="w-5 h-5" />
                <span>Mi Cuenta</span>
              </Link>
              <button
                onClick={closeMobileMenu}
                className="flex items-center gap-3 hover:text-blue-600 transition-colors text-sm font-medium text-left"
              >
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}