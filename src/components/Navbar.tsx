import { ShoppingCart, Menu, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <Link to="/">
              <h1 className="text-2xl font-bold text-primary cursor-pointer hover:opacity-80 transition-opacity">
                County Pastry Chef
              </h1>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Главная
              </Link>
              <Link to="/products" className="text-foreground hover:text-primary transition-colors">
                Продукция
              </Link>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors">
                О нас
              </Link>
              <Link to="/blog" className="text-foreground hover:text-primary transition-colors">
                Блог
              </Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
                Контакты
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hover:bg-secondary">
              <User className="h-5 w-5" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="hover:bg-secondary relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
