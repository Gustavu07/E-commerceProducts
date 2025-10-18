"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    image: "/trending-1.png",
    text: "Ofertas de Temporada",
  },
  {
    image: "/trending-2.png",
    text: "Rompiendo con Estilos",
  },
  {
    image: "/trending-3.png",
    text: "Nueva Colección 2025",
  },
];

export default function Banner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, [index]);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-6" aria-label="Banner principal">
      <div className="w-full max-w-[1600px] mx-auto relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-2xl">

      <AnimatePresence>
        <motion.img
          key={slides[index].image}
          src={slides[index].image}
          alt={slides[index].text}
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].text}
          className="absolute top-1/4 w-full flex flex-col items-center text-center text-white px-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
            {slides[index].text}
            </h2>
          <Button variant="default" size="lg" >
            Ver productos
          </Button>
        </motion.div>
      </AnimatePresence>

      <button
          onClick={prevImage}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white text-black p-2 rounded-full transition-colors"
          aria-label="Imagen anterior"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white text-black p-2 rounded-full transition-colors"
          aria-label="Siguiente imagen"
        >
          <ChevronRight size={24} />
        </button>

        <div className="absolute bottom-4 w-full flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === index ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Ir a imagen ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
