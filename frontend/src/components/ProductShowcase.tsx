import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
}

const ProductShowcase = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .limit(3);

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section id="products" className="py-20 gradient-soft">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши шедевры</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Загрузка продуктов...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20 gradient-soft">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши шедевры</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Откройте для себя наши самые любимые творения, сделанные вручную из отборных ингредиентов с душой
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              id={product.id}
              image={product.image_url}
              title={product.title}
              description={product.description || ''}
              price={product.price.toString()}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
