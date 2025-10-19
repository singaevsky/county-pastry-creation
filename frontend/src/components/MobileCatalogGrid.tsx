import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Eye, Star, Clock, ChevronLeft, ChevronRight } from "lucide-react";
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
  rating?: number;
  prepTime?: number;
}

const MobileCatalogGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
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
        // Добавляем случайные рейтинги и время приготовления для демонстрации
        const enhancedProducts = productsData.map(product => ({
          ...product,
          rating: Math.floor(Math.random() * 2) + 4, // 4-5 звезд
          prepTime: Math.floor(Math.random() * 3) + 1, // 1-3 часа
        }));
        
        setProducts(enhancedProducts);
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

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="space-y-4">
          {/* Основная карточка - скелетон */}
          <Card className="h-[400px] bg-gradient-to-br from-blue-50 to-blue-100 animate-pulse">
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto mb-4 animate-pulse"></div>
                <div className="h-8 bg-blue-200 rounded w-48 mx-auto mb-2 animate-pulse"></div>
                <div className="h-4 bg-blue-200 rounded w-32 mx-auto animate-pulse"></div>
              </div>
            </div>
          </Card>
          
          {/* Дополнительные карточки - скелетоны */}
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="h-[120px] bg-gradient-to-br from-purple-50 to-purple-100 animate-pulse">
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

  const mainProduct = products[currentIndex];
  const secondaryProducts = products.filter((_, index) => index !== currentIndex).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="space-y-6">
        {/* Основная карточка */}
        <Card className="h-[400px] overflow-hidden group cursor-pointer shadow-soft hover:shadow-elegant transition-all duration-500">
          <div className="relative h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 group-hover:from-blue-100 group-hover:via-blue-200 group-hover:to-blue-300 transition-all duration-500"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-between p-6">
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-3">
                    <Badge variant="secondary" className="bg-blue-200 text-blue-800 hover:bg-blue-300">
                      {mainProduct.category}
                    </Badge>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-3 group-hover:text-blue-800 transition-colors duration-300">
                    {mainProduct.title}
                  </h2>
                  <p className="text-sm text-blue-700 max-w-sm mx-auto leading-relaxed group-hover:text-blue-600 transition-colors duration-300">
                    {mainProduct.description}
                  </p>
                  
                  <div className="flex justify-center items-center gap-3 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium text-blue-800">{mainProduct.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-blue-600" />
                      <span className="text-xs text-blue-700">{mainProduct.prepTime}ч</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900 mb-4 group-hover:text-blue-800 transition-colors duration-300">
                    {mainProduct.price} ₽
                  </div>
                  
                  <div className="flex justify-center gap-2">
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => handleAddToCart(mainProduct)}
                    >
                      <ShoppingCart className="mr-1 h-4 w-4" />
                      В корзину
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300"
                      asChild
                    >
                      <Link to={`/product/${mainProduct.id}`}>
                        <Eye className="mr-1 h-4 w-4" />
                        Подробнее
                      </Link>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={`border-blue-300 transition-all duration-300 ${
                        favorites.has(mainProduct.id) 
                          ? 'bg-red-50 border-red-300 text-red-700 hover:bg-red-100' 
                          : 'text-blue-700 hover:bg-blue-50 hover:border-blue-400'
                      }`}
                      onClick={() => toggleFavorite(mainProduct.id)}
                    >
                      <Heart className={`h-4 w-4 ${favorites.has(mainProduct.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Навигация для основной карточки */}
        <div className="flex justify-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={prevProduct}
            className="border-blue-300 text-blue-700 hover:bg-blue-50"
            title="Предыдущий продукт"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-1">
            {products.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-blue-200'
                }`}
                onClick={() => setCurrentIndex(index)}
                title={`Перейти к продукту ${index + 1}`}
              />
            ))}
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={nextProduct}
            className="border-blue-300 text-blue-700 hover:bg-blue-50"
            title="Следующий продукт"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Дополнительные карточки */}
        <div className="grid grid-cols-2 gap-3">
          {secondaryProducts.map((product, index) => (
            <Card 
              key={product.id}
              className={`h-[120px] overflow-hidden group cursor-pointer shadow-soft hover:shadow-elegant transition-all duration-300 ${
                index % 2 === 0 
                  ? 'bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 hover:from-purple-100 hover:via-purple-200 hover:to-purple-300' 
                  : 'bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 hover:from-blue-100 hover:via-blue-200 hover:to-blue-300'
              }`}
            >
              <div className="relative h-full p-3">
                <div className="h-full flex flex-col justify-between">
                  <div className="text-center">
                    <div className="flex justify-center mb-1">
                      <Badge variant="outline" className="text-xs bg-white/50 border-white/30 text-gray-700">
                        {product.category}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xs font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 line-clamp-2 mb-1">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2 mb-1">
                      {product.description}
                    </p>
                    
                    <div className="flex justify-center items-center gap-1 mb-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-2 w-2 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium text-gray-700">{product.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-2 w-2 text-gray-600" />
                        <span className="text-xs text-gray-600">{product.prepTime}ч</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 mb-1">
                      {product.price} ₽
                    </div>
                    
                    <div className="flex justify-center gap-1">
                      <Button 
                        size="sm" 
                        className="h-6 px-1 bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 shadow-sm hover:shadow-md transition-all duration-300"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-3 w-3" />
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-6 px-1 border-white/50 text-gray-700 hover:bg-white/50 hover:border-white transition-all duration-300"
                        asChild
                      >
                        <Link to={`/product/${product.id}`}>
                          <Eye className="h-3 w-3" />
                        </Link>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={`h-6 px-1 border-white/50 transition-all duration-300 ${
                          favorites.has(product.id) 
                            ? 'bg-red-50 border-red-300 text-red-700 hover:bg-red-100' 
                            : 'text-gray-700 hover:bg-white/50 hover:border-white'
                        }`}
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Heart className={`h-3 w-3 ${favorites.has(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
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

export default MobileCatalogGrid;
