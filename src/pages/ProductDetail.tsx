import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft, Minus, Plus, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/lib/supabase";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image_url,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 flex justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Товар не найден</h1>
          <Link to="/products">
            <Button>Вернуться к каталогу</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const categoryNames: Record<string, string> = {
    "cakes": "Торты",
    "pastries": "Выпечка",
    "custom": "На заказ",
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <Link
            to="/products"
            className="inline-flex items-center text-primary hover:underline mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к каталогу
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted shadow-elegant">
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm mb-4">
                {categoryNames[product.category] || product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {product.title}
              </h1>
              <p className="text-3xl font-bold text-primary mb-6">
                ${product.price.toFixed(2)}
              </p>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Описание</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="flex-1 gradient-warm text-white"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Добавить в корзину
                </Button>
              </div>

              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Условия доставки</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Бесплатная доставка при заказе от $50</li>
                  <li>• Доставка в течение 2-3 часов</li>
                  <li>• Возможен самовывоз</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
