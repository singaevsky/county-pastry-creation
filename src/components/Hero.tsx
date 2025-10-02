import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-bakery.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl py-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Handcrafted with Love,
            <span className="block text-primary">Baked to Perfection</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Experience the finest artisan pastries, custom cakes, and baked goods made fresh daily with premium ingredients.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="gradient-warm text-white shadow-elegant hover:opacity-90 transition-all">
              Order Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="hover:bg-secondary">
              View Menu
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
