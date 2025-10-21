"use client";

import React, { useState } from "react";
import { Heart, ShoppingCart, Minus, Plus, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext"; // <-- crea este pequeño hook helper
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
      setQuantity(1); // Resetear cantidad después de agregar
    }, 1000);
  };
 return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-900">
              Inicio
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/productos" className="text-gray-500 hover:text-gray-900">
              Productos
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/productos">
          <Button variant="ghost" className="mb-6 -ml-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a productos
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-200">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            <button className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
              <Heart className="w-6 h-6 text-gray-600 hover:text-red-500 transition-colors" />
            </button>
          </div>

          <div className="space-y-6">
            {product.category && (
              <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {product.category}
              </div>
            )}

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              {product.brand && (
                <p className="text-lg text-gray-600">
                  Marca: <span className="font-semibold">{product.brand}</span>
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-orange-400 fill-orange-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({Math.floor(Math.random() * 100) + 20} reseñas)
              </span>
            </div>
            <div className="border-t border-b border-gray-200 py-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${(product.price * 1.2).toFixed(2)}
                </span>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded">
                  -20%
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Descripción</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-3">
                Cantidad
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={decrementQuantity}
                    className="px-4 py-2"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-6 py-2 font-semibold text-lg">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={incrementQuantity}
                    className="px-4 py-2"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-gray-600">
                  Total: <span className="font-bold text-gray-900">${totalPrice}</span>
                </span>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-700 font-medium">
                  En stock - Envío inmediato
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                size="lg"
               className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isAdding ? "¡Agregado!" : "Agregar al carrito"}
              </Button>
           </div>
           {isAdding && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
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