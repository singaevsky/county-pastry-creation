import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/lib/supabase";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  featured?: boolean;
}

const CatalogGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) throw error;
        
        const productsData = data || [];
        setProducts(productsData);
        
        // Устанавливаем первый продукт как выбранный по умолчанию
        if (productsData.length > 0) {
          setSelectedProduct(productsData[0]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image_url,
    });
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основная карточка - скелетон */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] bg-gradient-to-br from-blue-50 to-blue-100 animate-pulse">
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto mb-4 animate-pulse"></div>
                  <div className="h-8 bg-blue-200 rounded w-48 mx-auto mb-2 animate-pulse"></div>
                  <div className="h-4 bg-blue-200 rounded w-32 mx-auto animate-pulse"></div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Дополнительные карточки - скелетоны */}
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="h-[140px] bg-gradient-to-br from-purple-50 to-purple-100 animate-pulse">
                <div className="h-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-purple-200 rounded-full animate-pulse"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Продукты не найдены</h2>
          <p className="text-muted-foreground">Попробуйте обновить страницу</p>
        </div>
      </div>
    );
  }

  const mainProduct = selectedProduct || products[0];
  const secondaryProducts = products.slice(1, 5);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Основная карточка слева */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] overflow-hidden group cursor-pointer shadow-soft hover:shadow-elegant transition-all duration-500">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 group-hover:from-blue-100 group-hover:via-blue-200 group-hover:to-blue-300 transition-all duration-500"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-between p-8">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-center mb-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 group-hover:text-blue-800 transition-colors duration-300">
                      {mainProduct.title}
                    </h2>
                    <p className="text-lg text-blue-700 max-w-md mx-auto leading-relaxed group-hover:text-blue-600 transition-colors duration-300">
                      {mainProduct.description}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-900 mb-6 group-hover:text-blue-800 transition-colors duration-300">
                      {mainProduct.price} ₽
                    </div>
                    
                    <div className="flex justify-center gap-4">
                      <Button 
                        size="lg" 
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() => handleAddToCart(mainProduct)}
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        В корзину
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300"
                        asChild
                      >
                        <Link to={`/product/${mainProduct.id}`}>
                          <Eye className="mr-2 h-5 w-5" />
                          Подробнее
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Дополнительные карточки справа */}
        <div className="grid grid-cols-2 gap-4">
          {secondaryProducts.map((product, index) => (
            <Card 
              key={product.id}
              className={`h-[140px] overflow-hidden group cursor-pointer shadow-soft hover:shadow-elegant transition-all duration-300 ${
                index % 2 === 0 
                  ? 'bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 hover:from-purple-100 hover:via-purple-200 hover:to-purple-300' 
                  : 'bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 hover:from-blue-100 hover:via-blue-200 hover:to-blue-300'
              }`}
              onClick={() => handleProductSelect(product)}
            >
              <div className="relative h-full p-4">
                <div className="h-full flex flex-col justify-between">
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 line-clamp-2 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2 mb-2">
                      {product.description}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 mb-2">
                      {product.price} ₽
                    </div>
                    
                    <div className="flex justify-center gap-1">
                      <Button 
                        size="sm" 
                        className="h-8 px-2 bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 shadow-sm hover:shadow-md transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                      >
                        <ShoppingCart className="h-3 w-3" />
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-8 px-2 border-white/50 text-gray-700 hover:bg-white/50 hover:border-white transition-all duration-300"
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Link to={`/product/${product.id}`}>
                          <Eye className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogGrid;
