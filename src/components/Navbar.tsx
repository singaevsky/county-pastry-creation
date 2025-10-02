import { ShoppingCart, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-primary">County Pastry Chef</h1>
            
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors">Home</a>
              <a href="#products" className="text-foreground hover:text-primary transition-colors">Products</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Custom Cakes</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Recipes</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">About</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hover:bg-secondary">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-secondary">
              <ShoppingCart className="h-5 w-5" />
            </Button>
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
