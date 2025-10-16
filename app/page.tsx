import ProductHome from "@/components/products/homeProducts";
import  Banner  from "@/components/banner/Banner"
export default function Home() {
   return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gray-50">
       <Banner />
      <ProductHome />
    </main>
  );
}
