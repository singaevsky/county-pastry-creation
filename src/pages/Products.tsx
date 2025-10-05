import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import chocolateCake from "@/assets/chocolate-cake.jpg";
import pastries from "@/assets/pastries.jpg";
import customCake from "@/assets/custom-cake.jpg";

const categories = ["Все", "Торты", "Выпечка", "На заказ"];

const allProducts = [
  {
    id: "1",
    image: chocolateCake,
    title: "Шоколадный торт мечты",
    description: "Нежные шоколадные коржи с шелковистым ганашем",
    price: 45.0,
    category: "Торты",
  },
  {
    id: "2",
    image: pastries,
    title: "Набор авторской выпечки",
    description: "Ассорти свежих круассанов, датских булочек и слоёных изделий",
    price: 28.0,
    category: "Выпечка",
  },
  {
    id: "3",
    image: customCake,
    title: "Праздничный торт на заказ",
    description:
      "Персонализированный многоярусный торт для вашего особого случая",
    price: 120.0,
    category: "На заказ",
  },
  {
    id: "4",
    image: chocolateCake,
    title: "Клубничный торт",
    description: "Свежая клубника с воздушным кремом",
    price: 42.0,
    category: "Торты",
  },
  {
    id: "5",
    image: pastries,
    title: "Французские круассаны",
    description: "Хрустящие слоёные круассаны с маслом",
    price: 15.0,
    category: "Выпечка",
  },
  {
    id: "6",
    image: customCake,
    title: "Свадебный торт",
    description: "Элегантный многоярусный торт для вашей свадьбы",
    price: 250.0,
    category: "На заказ",
  },
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const { addToCart } = useCart();

  const filteredProducts =
    selectedCategory === "Все"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (product: typeof allProducts[0]) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
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
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden group cursor-pointer shadow-soft hover:shadow-elegant transition-all duration-300"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={product.image}
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
