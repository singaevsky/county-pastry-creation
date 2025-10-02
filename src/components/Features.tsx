import { Leaf, Clock, Heart, Award } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "We use only the finest, locally-sourced ingredients"
  },
  {
    icon: Clock,
    title: "Baked Daily",
    description: "Everything made fresh each morning"
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Traditional recipes perfected over generations"
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized for excellence in artisan baking"
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
