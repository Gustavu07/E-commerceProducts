"use client";

import React from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Tipo de producto
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
}

// Data de ejemplo - reemplaza con tu import real
const products: Product[] = [
  {
    id: "1",
    name: "Apple AirPods Pro 2nd gen",
    description: "Apple AirPods Pro (2nd Gen) with M...",
    price: 399.99,
    image: "/products/apple_earphone_image.png",
    rating: 4.5,
  },
  {
    id: "2",
    name: "Bose QuietComfort 45",
    description: "The Bose QuietComfort 45 headph...",
    price: 329.99,
    image: "/products/bose_headphone_image.png",
    rating: 4.5,
  },
  {
    id: "3",
    name: "Samsung Galaxy S23",
    description: "The Samsung Galaxy S23 offers an...",
    price: 799.99,
    image: "/products/samsung_s23phone_image.png",
    rating: 4.5,
  },
  {
    id: "4",
    name: "Garmin Venu 2",
    description: "The Garmin Venu 2 smartwatch ble...",
    price: 349.99,
    image: "/products/projector_image.png",
    rating: 4.5,
  },
  {
    id: "5",
    name: "PlayStation 5",
    description: "The PlayStation 5 takes gaming to t...",
    price: 499.99,
    image: "/products/asus_laptop_image.png",
    rating: 4.5,
  },
];

// Componente de estrellas de rating
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-sm font-medium">{rating}</span>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating) ? "text-orange-400 fill-orange-400" : "text-gray-300"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </div>
  );
}

export default function ProductGrid() {
  return (
    <div className="my-8 w-full max-w-7xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <Card 
            key={product.id} 
            className="group relative overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <button className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors">
              <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
            </button>

            <CardContent className="p-0">
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 space-y-3">
                <h3 className="font-semibold text-gray-900 text-base line-clamp-1">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">
                  {product.description}
                </p>

                <StarRating rating={product.rating} />

                <div className="flex items-center justify-between pt-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-sm hover:bg-gray-900 hover:text-white transition-colors"
                  >
                    Buy now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}