import ProductDetail from '@/components/products/ProductDetail'
import { products } from '@/data/products'
import { notFound } from 'next/navigation'

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = products.find(p => p.id === id)
  
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