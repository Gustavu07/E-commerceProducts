"use client";

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-10">
      {/* Sección superior */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700">
        <div>
          <h3 className="font-semibold mb-4 text-sm uppercase">Productos</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white">Hombre</a></li>
            <li><a href="#" className="hover:text-white">Mujer</a></li>
            <li><a href="#" className="hover:text-white">Niños</a></li>
            <li><a href="#" className="hover:text-white">Novedades</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-sm uppercase">Ayuda</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white">Envíos</a></li>
            <li><a href="#" className="hover:text-white">Devoluciones</a></li>
            <li><a href="#" className="hover:text-white">Pedidos</a></li>
            <li><a href="#" className="hover:text-white">Contacto</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-sm uppercase">Empresa</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white">Acerca de</a></li>
            <li><a href="#" className="hover:text-white">Carreras</a></li>
            <li><a href="#" className="hover:text-white">Noticias</a></li>
            <li><a href="#" className="hover:text-white">Sostenibilidad</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-sm uppercase">Síguenos</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-400"><Instagram size={20} /></a>
            <a href="#" className="hover:text-gray-400"><Facebook size={20} /></a>
            <a href="#" className="hover:text-gray-400"><Twitter size={20} /></a>
            <a href="#" className="hover:text-gray-400"><Youtube size={20} /></a>
          </div>
        </div>
      </div>

      {/* Sección inferior */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} E-Shop. Todos los derechos reservados.</p>
        <div className="flex gap-4 mt-3 md:mt-0">
          <a href="#" className="hover:text-white">Política de Privacidad</a>
          <a href="#" className="hover:text-white">Términos de Uso</a>
          <a href="#" className="hover:text-white">Cookies</a>
        </div>
      </div>
    </footer>
  );
}