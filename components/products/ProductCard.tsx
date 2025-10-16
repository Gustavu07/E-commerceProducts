"use client";

import React, { useState } from "react";
import { Heart, SlidersHorizontal, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { products } from "@/data/products"
import Image from "next/image";


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

export default function ProductCard() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRanges, setPriceRanges] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  
  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category).filter((c): c is string => c !== undefined)))];
  const brands = Array.from(new Set(products.map((p) => p.brand).filter(Boolean))) as string[];

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handlePriceRangeChange = (range: string) => {
    setPriceRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const isPriceInRange = (price: number) => {
    if (priceRanges.length === 0) return true;
    
    return priceRanges.some((range) => {
      switch (range) {
        case "0-100":
          return price <= 100;
        case "100-200":
          return price > 100 && price <= 200;
        case "200-400":
          return price > 200 && price <= 400;
        case "400+":
          return price > 400;
        default:
          return true;
      }
    });
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand || "");
    const priceMatch = isPriceInRange(product.price);
    
    return categoryMatch && brandMatch && priceMatch;
  });

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedBrands([]);
    setPriceRanges([]);
  };

  const FilterSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Categorías</h3>
        <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value={category} id={`category-${category}`} />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm font-normal cursor-pointer capitalize"
              >
                {category === "all" ? "Todas" : category}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Marcas</h3>
        <div className="space-y-3">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => handleBrandChange(brand)}
              />
              <Label
                htmlFor={`brand-${brand}`}
                className="text-sm font-normal cursor-pointer"
              >
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Precio</h3>
        <div className="space-y-3">
          {[
            { id: "0-100", label: "Menos de $100" },
            { id: "100-200", label: "$100 - $200" },
            { id: "200-400", label: "$200 - $400" },
            { id: "400+", label: "Más de $400" },
          ].map((range) => (
            <div key={range.id} className="flex items-center space-x-2">
              <Checkbox
                id={`price-${range.id}`}
                checked={priceRanges.includes(range.id)}
                onCheckedChange={() => handlePriceRangeChange(range.id)}
              />
              <Label
                htmlFor={`price-${range.id}`}
                className="text-sm font-normal cursor-pointer"
              >
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={clearFilters}
      >
        Limpiar Filtros
      </Button>
    </div>
  );
  return (
    <div className="my-8 w-full max-w-7xl mx-auto px-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Todos Los Productos</h2>
        
        <Button
          variant="outline"
          className="md:hidden flex items-center gap-2"
          onClick={() => setIsMobileFilterOpen(true)}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
        </Button>
      </div>

      <div className="flex gap-8">
        {/* Filtros Desktop */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-6 bg-white p-6 rounded-lg border border-gray-200">
            <FilterSection />
          </div>
        </aside>

        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filtros</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileFilterOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <FilterSection />
              </div>
            </div>
          </div>
        )}

      <div className="flex-1">
          <p className="text-sm text-gray-600 mb-4">
            Mostrando {filteredProducts.length} de {products.length} productos
          </p>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No se encontraron productos con los filtros seleccionados.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
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
                          Comprar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}