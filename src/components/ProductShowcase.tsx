import ProductCard from "./ProductCard";
import chocolateCake from "@/assets/chocolate-cake.jpg";
import pastries from "@/assets/pastries.jpg";
import customCake from "@/assets/custom-cake.jpg";

const products = [
  {
    image: chocolateCake,
    title: "Шоколадный торт мечты",
    description: "Нежные шоколадные коржи с шелковистым ганашем",
    price: "45.00"
  },
  {
    image: pastries,
    title: "Набор авторской выпечки",
    description: "Ассорти свежих круассанов, датских булочек и слоёных изделий",
    price: "28.00"
  },
  {
    image: customCake,
    title: "Праздничный торт на заказ",
    description: "Персонализированный многоярусный торт для вашего особого случая",
    price: "120.00"
  }
];

const ProductShowcase = () => {
  return (
    <section id="products" className="py-20 gradient-soft">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши шедевры</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Откройте для себя наши самые любимые творения, сделанные вручную из отборных ингредиентов с душой
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
