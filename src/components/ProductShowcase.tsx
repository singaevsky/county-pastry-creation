import ProductCard from "./ProductCard";
import chocolateCake from "@/assets/chocolate-cake.jpg";
import pastries from "@/assets/pastries.jpg";
import customCake from "@/assets/custom-cake.jpg";

const products = [
  {
    image: chocolateCake,
    title: "Chocolate Dream Cake",
    description: "Rich, moist chocolate layers with silky ganache frosting",
    price: "45.00"
  },
  {
    image: pastries,
    title: "Artisan Pastry Box",
    description: "Assorted fresh croissants, danishes, and butter pastries",
    price: "28.00"
  },
  {
    image: customCake,
    title: "Custom Celebration Cake",
    description: "Personalized multi-tiered cake for your special occasion",
    price: "120.00"
  }
];

const ProductShowcase = () => {
  return (
    <section id="products" className="py-20 gradient-soft">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Delights</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most beloved creations, handcrafted with premium ingredients and passion
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
