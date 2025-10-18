import ProductDetail from '@/components/products/ProductDetail'
import { products } from '@/data/products'
import { notFound } from 'next/navigation'

export default function ProductDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const product = products.find(p => p.id === params.id)
  
  if (!product) {
    notFound()
  }
  
  return <ProductDetail product={product} />
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}