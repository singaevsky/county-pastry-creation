import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: string;
}

const ProductCard = ({ id, image, title, description, price }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      title,
      price: parseFloat(price),
      image,
    });
  };

  return (
    <Card className="overflow-hidden group cursor-pointer shadow-soft hover:shadow-elegant transition-all duration-300">
      <Link to={`/product/${id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
      <div className="p-6 flex flex-col gap-4">
        <Link to={`/product/${id}`}>
          <h3 className="text-2xl font-bold hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold text-primary">
            {price} ₽
          </span>
          <Button 
            size="sm" 
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            В корзину
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
