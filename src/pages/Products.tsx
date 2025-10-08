import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/lib/supabase";

const categories = ["Все", "cakes", "pastries", "custom"];
const categoryNames: Record<string, string> = {
  "Все": "Все",
  "cakes": "Торты",
  "pastries": "Выпечка",
  "custom": "На заказ",
};

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
}

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let query = supabase.from('products').select('*');
        
        if (selectedCategory !== "Все") {
          query = query.eq('category', selectedCategory);
        }

        const { data, error } = await query;

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image_url,
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="py-20 gradient-soft">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Каталог продукции
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Выберите из нашего ассортимента изысканных десертов
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="min-w-[120px]"
              >
                {categoryNames[category]}
              </Button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Загрузка продуктов...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Продукты не найдены</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden group cursor-pointer shadow-soft hover:shadow-elegant transition-all duration-300"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                  <div className="p-6">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        ${product.price.toFixed(2)}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        В корзину
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
