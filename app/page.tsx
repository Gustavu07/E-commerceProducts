import Image from "next/image";
import { Button } from "@/components/ui/button";
export default function Home() {
   return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">Bienvenido a mi E-commerce</h1>

      <div className="flex gap-4">
        <Button variant="default" size="lg">
          Ver productos
        </Button>

        <Button variant="outline" size="lg">
          Contactar
        </Button>
      </div>
    </main>
  );
}
