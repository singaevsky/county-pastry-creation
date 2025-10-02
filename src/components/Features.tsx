import { Leaf, Clock, Heart, Award } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Свежие ингредиенты",
    description: "Мы используем только лучшие местные продукты"
  },
  {
    icon: Clock,
    title: "Ежедневная выпечка",
    description: "Всё готовится свежим каждое утро"
  },
  {
    icon: Heart,
    title: "Сделано с любовью",
    description: "Традиционные рецепты, совершенствуемые поколениями"
  },
  {
    icon: Award,
    title: "Награды и признание",
    description: "Признанное мастерство в авторской выпечке"
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
