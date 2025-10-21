"use client";

import React, { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Star,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/productos";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const totalPrice = (product.price * quantity).toFixed(2);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-900">
              Inicio
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/productos" className="text-gray-500 hover:text-gray-900">
              Productos
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate max-w-[160px] sm:max-w-none">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Link href="/productos">
          <Button
            variant="ghost"
            className="mb-4 sm:mb-6 -ml-2 sm:-ml-4 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
            Volver
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
          {/* Imagen */}
          <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-200 aspect-square sm:aspect-[4/3]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            <button className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-3 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 hover:text-red-500 transition-colors" />
            </button>
          </div>

          {/* Detalles */}
          <div className="space-y-5 sm:space-y-6">
            {product.category && (
              <div className="inline-flex items-center px-2.5 py-1 bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium rounded-full">
                {product.category}
              </div>
            )}

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                {product.name}
              </h1>
              {product.brand && (
                <p className="text-sm sm:text-lg text-gray-600">
                  Marca: <span className="font-semibold">{product.brand}</span>
                </p>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-0.5 sm:gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-orange-400 fill-orange-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-gray-600">
                {product.rating} ({Math.floor(Math.random() * 100) + 20} reseñas)
              </span>
            </div>

            {/* Precio */}
            <div className="border-y border-gray-200 py-4 sm:py-6">
              <div className="flex items-baseline gap-2 sm:gap-3">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-sm sm:text-lg text-gray-500 line-through">
                  ${(product.price * 1.2).toFixed(2)}
                </span>
                <span className="px-1.5 sm:px-2 py-0.5 bg-red-100 text-red-800 text-xs sm:text-sm font-semibold rounded">
                  -20%
                </span>
              </div>
            </div>

            {/* Descripción */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Descripción
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Cantidad */}
            <div>
              <label className="block font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Cantidad
              </label>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={decrementQuantity}
                    className="px-3 sm:px-4 py-2"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 sm:px-6 py-2 font-semibold text-base">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={incrementQuantity}
                    className="px-3 sm:px-4 py-2"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <span className="text-gray-600 text-sm sm:text-base">
                  Total:{" "}
                  <span className="font-bold text-gray-900">${totalPrice}</span>
                </span>
              </div>
            </div>

            {/* Stock */}
            <div className="border-t border-gray-200 pt-4 sm:pt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-700 font-medium text-sm sm:text-base">
                  En stock - Envío inmediato
                </span>
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3 sm:pt-4">
              <Button
                size="lg"
                className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-0"
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isAdding ? "¡Agregado!" : "Agregar al carrito"}
              </Button>
            </div>

            {isAdding && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                <p className="text-green-800 text-sm font-medium">
                  ✓ Producto agregado al carrito
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
