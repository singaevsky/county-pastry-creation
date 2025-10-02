import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  price: string;
}

const ProductCard = ({ image, title, description, price }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden group cursor-pointer shadow-soft hover:shadow-elegant transition-all duration-300">
      <div className="aspect-square overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">${price}</span>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <ShoppingCart className="mr-2 h-4 w-4" />
            В корзину
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
