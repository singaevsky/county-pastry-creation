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
    <article className="bg-white border border-gray-200 overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-w-md">
      <Link to={`/product/${id}`}>
        <div className="aspect-square overflow-hidden bg-gray-50">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
      <div className="p-8 flex flex-col gap-3">
        <Link to={`/product/${id}`}>
          <h2 className="text-[2.5rem] font-bold leading-tight tracking-tight text-black hover:opacity-70 transition-opacity" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
            {title.toUpperCase()}
          </h2>
        </Link>
        <h3 className="text-[1.5rem] font-semibold text-black" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
          {description}
        </h3>
        <p className="text-base font-normal text-black uppercase tracking-wide" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
          {price}₽
        </p>
        <Button 
          size="lg" 
          onClick={handleAddToCart} 
          className="mt-4 w-full bg-black text-white hover:bg-gray-800 font-semibold"
          style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          В КОРЗИНУ
        </Button>
      </div>
    </article>
  );
};

export default ProductCard;
