"use client";

import React from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import  products  from "@/data/products";
import Image from "next/image";

export default function ProductCarousel() {
  return (
    <div className="my-8 w-full max-w-7xl flex-col items-start gap-4 px-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Productos Destacados</h2>

      <div className="flex gap-6 overflow-x-auto snap-x scrollbar-none">
        {products.map((product) => (
          <Card key={product.id} className="snap-start w-60 flex-shrink-0">
            <CardContent className="p-0">
             <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center px-4 py-2">
              <span className="font-bold text-gray-800">${product.price}</span>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Heart size={20} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <ShoppingCart size={20} />
                </button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}