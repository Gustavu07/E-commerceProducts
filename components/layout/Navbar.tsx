"use client";

import { Menu, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-sm bg-white">
      <div className="flex items-center gap-2">
        <Image src="nike-4-logo-svgrepo-com.svg" alt="Logo" width={40} height={40} />
      </div>

      <div className="hidden md:flex gap-6 text-sm font-medium">
        <a href="#" className="hover:text-primary">Hombres</a>
        <a href="#" className="hover:text-primary">Mujeres</a>
        <a href="#" className="hover:text-primary">Niños</a>
        <a href="#" className="hover:text-primary">Ofertas</a>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon"><SearchIcon /></Button>
        <Button variant="ghost" size="icon"><ShoppingCart /></Button>
        <Button variant="ghost" size="icon"><User /></Button>
        <Button variant="ghost" size="icon" className="md:hidden"><Menu /></Button>
      </div>
    </nav>
  );
}

function SearchIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>;
}
