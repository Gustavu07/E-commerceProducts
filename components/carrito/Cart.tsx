"use client";

import React from "react";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import confetti from 'canvas-confetti'; 
export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  const handleCheckout = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd']
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 200);
  };
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-8">
            Agrega productos para comenzar tu compra
          </p>
          <Link href="/productos">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Explorar productos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Carrito de Compras</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              {totalItems} {totalItems === 1 ? "producto" : "productos"} en tu carrito
            </p>
          </div>
          <Link href="/productos">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Seguir comprando
            </Button>
          </Link>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.product.id} className="overflow-hidden">
                <CardContent className="p-3 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    {/* Imagen */}
                    <div className="relative w-full sm:w-32 h-40 sm:h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden mx-auto sm:mx-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <Link href={`/productos/${item.product.id}`}>
                            <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors text-base sm:text-lg line-clamp-2">
                              {item.product.name}
                            </h3>
                          </Link>
                          {item.product.brand && (
                            <p className="text-sm text-gray-500 mt-1">
                              Marca: {item.product.brand}
                            </p>
                          )}
                          {item.product.category && (
                            <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {item.product.category}
                            </span>
                          )}
                        </div>

                        <div className="text-right w-full sm:w-auto">
                          <p className="text-lg font-bold text-gray-900">${item.product.price}</p>
                          <p className="text-sm text-gray-500">c/u</p>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-3">
                        <div className="flex items-center justify-center sm:justify-start border border-gray-300 rounded-lg w-fit mx-auto sm:mx-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="px-4 py-1 font-semibold text-gray-900 min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3">
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Subtotal</p>
                            <p className="text-lg sm:text-xl font-bold text-gray-900">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.product.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              variant="outline"
              onClick={clearCart}
              className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Vaciar carrito
            </Button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Resumen de compra
                </h3>

                <div className="space-y-4 mb-6 text-sm sm:text-base">
                  <div className="flex justify-between text-gray-600">
                    <span>
                      Subtotal ({totalItems} {totalItems === 1 ? "producto" : "productos"})
                    </span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span className="font-semibold text-green-600">Gratis</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-gray-900">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-3 hover:-translate-y-1 transition-transform"
                  onClick={handleCheckout}
                >
                  Pagar
                </Button>

                <Link href="/productos">
                  <Button variant="outline" size="lg" className="w-full">
                    Continuar comprando
                  </Button>
                </Link>

                <div className="mt-6 space-y-3 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                    <p>Envío gratis en compras mayores a $50</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                    <p>Garantía de 30 días en todos los productos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}