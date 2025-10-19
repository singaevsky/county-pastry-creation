import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, ChefHat } from "lucide-react";

const Recipes = () => {
  const recipes = [
    {
      id: 1,
      title: "Классический медовик",
      description: "Традиционный русский торт с медовыми коржами и нежным кремом",
      time: "2 часа",
      servings: "8-10",
      difficulty: "Средне",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=600&fit=crop"
    },
    {
      id: 2,
      title: "Французские макаронс",
      description: "Воздушные миндальные пирожные с разными начинками",
      time: "3 часа",
      servings: "20-25 шт",
      difficulty: "Сложно",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Чизкейк Нью-Йорк",
      description: "Классический американский чизкейк на песочной основе",
      time: "1.5 часа + охлаждение",
      servings: "12",
      difficulty: "Средне",
      image: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=800&h=600&fit=crop"
    },
    {
      id: 4,
      title: "Эклеры с заварным кремом",
      description: "Французские пирожные из заварного теста с ванильным кремом",
      time: "2.5 часа",
      servings: "15-20 шт",
      difficulty: "Сложно",
      image: "https://images.unsplash.com/photo-1612201142855-a2e5f449d30a?w=800&h=600&fit=crop"
    },
    {
      id: 5,
      title: "Тарт с лимоном",
      description: "Песочный тарт с кремовой лимонной начинкой и меренгой",
      time: "2 часа",
      servings: "8",
      difficulty: "Средне",
      image: "https://images.unsplash.com/photo-1519915212116-7cfef71f1d3e?w=800&h=600&fit=crop"
    },
    {
      id: 6,
      title: "Пирожное Картошка",
      description: "Любимое пирожное из детства без выпечки",
      time: "30 минут + охлаждение",
      servings: "15 шт",
      difficulty: "Легко",
      image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&h=600&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Рецепты"
        description="Профессиональные кондитерские рецепты от Уездного кондитера. Попробуйте приготовить наши фирменные десерты дома!"
        keywords="рецепты тортов, кондитерские рецепты, домашняя выпечка, рецепты десертов"
      />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-soft py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Наши рецепты</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Делимся профессиональными секретами кондитерского мастерства. 
              Попробуйте приготовить наши фирменные десерты дома!
            </p>
          </div>
        </section>

        {/* Recipes Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe) => (
                <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{recipe.title}</CardTitle>
                    <CardDescription>{recipe.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{recipe.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{recipe.servings}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ChefHat className="h-4 w-4" />
                        <span>{recipe.difficulty}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Не хотите готовить сами?</h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Закажите любой десерт из нашего каталога — мы приготовим его профессионально!
            </p>
            <a 
              href="/products" 
              className="inline-block bg-background text-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Посмотреть каталог
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Recipes;
