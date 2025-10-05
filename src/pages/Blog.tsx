import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import chocolateCake from "@/assets/chocolate-cake.jpg";
import pastries from "@/assets/pastries.jpg";
import customCake from "@/assets/custom-cake.jpg";

const blogPosts = [
  {
    id: 1,
    title: "Секреты идеального шоколадного торта",
    excerpt:
      "Узнайте, как приготовить торт, который тает во рту. Делимся профессиональными секретами.",
    image: chocolateCake,
    date: "15 января 2024",
    category: "Рецепты",
  },
  {
    id: 2,
    title: "Как выбрать торт для свадьбы",
    excerpt:
      "Руководство по выбору идеального свадебного торта. От дизайна до вкуса.",
    image: customCake,
    date: "10 января 2024",
    category: "Советы",
  },
  {
    id: 3,
    title: "История французской выпечки",
    excerpt:
      "Путешествие в мир круассанов, багетов и других французских деликатесов.",
    image: pastries,
    date: "5 января 2024",
    category: "История",
  },
  {
    id: 4,
    title: "Новая коллекция весенних тортов",
    excerpt:
      "Представляем новую линейку тортов с весенними мотивами и свежими ягодами.",
    image: chocolateCake,
    date: "1 января 2024",
    category: "Новости",
  },
  {
    id: 5,
    title: "5 идей для детского праздника",
    excerpt:
      "Креативные идеи оформления детских тортов и сладкого стола.",
    image: customCake,
    date: "28 декабря 2023",
    category: "Советы",
  },
  {
    id: 6,
    title: "Полезная выпечка: миф или реальность?",
    excerpt:
      "Разбираемся, можно ли сделать выпечку полезной и не потерять вкус.",
    image: pastries,
    date: "20 декабря 2023",
    category: "Здоровье",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Блог и новости
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Рецепты, советы и новости из мира кондитерского искусства
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden group cursor-pointer shadow-soft hover:shadow-elegant transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 gradient-soft">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Подпишитесь на новости</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Получайте эксклюзивные рецепты, советы от профессионалов и
            специальные предложения
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-4 py-3 rounded-md border border-border bg-background"
            />
            <button className="px-6 py-3 rounded-md gradient-warm text-white font-medium hover:opacity-90 transition-opacity">
              Подписаться
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
