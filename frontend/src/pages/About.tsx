import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Award, Heart, Users, Clock } from "lucide-react";
import heroImage from "@/assets/hero-bakery.jpg";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative min-h-[400px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl py-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">О нас</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Создаём вкусные воспоминания с 1995 года
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Наша история</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Уездный кондитер начался как маленькая семейная пекарня в самом
              сердце города. Наша история началась более 25 лет назад, когда
              наша основательница, опытный кондитер с многолетним стажем,
              решила воплотить свою мечту в жизнь.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Сегодня мы гордимся тем, что сохранили традиционные рецепты и
              технологии, совершенствуя их из поколения в поколение. Каждое
              изделие создаётся с любовью и заботой о наших клиентах.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">25+</h3>
              <p className="text-muted-foreground">Лет опыта</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">10000+</h3>
              <p className="text-muted-foreground">Довольных клиентов</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">15</h3>
              <p className="text-muted-foreground">Наград</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">100%</h3>
              <p className="text-muted-foreground">С любовью</p>
            </div>
          </div>

          <div className="bg-gradient-soft rounded-2xl p-12 mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Наша философия</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Мы верим, что каждое кондитерское изделие должно быть не просто
                вкусным, но и создавать особенное настроение. Именно поэтому мы
                тщательно отбираем ингредиенты, работаем только с проверенными
                поставщиками и никогда не идём на компромисс в вопросах
                качества.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Наша команда - это профессионалы, которые вкладывают душу в
                каждое изделие. Мы постоянно совершенствуем свои навыки,
                изучаем новые техники и создаём уникальные рецепты.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Наши ценности</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Качество</h3>
                <p className="text-muted-foreground">
                  Используем только отборные ингредиенты высшего качества
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Традиции</h3>
                <p className="text-muted-foreground">
                  Сохраняем классические рецепты и семейные секреты
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Инновации</h3>
                <p className="text-muted-foreground">
                  Постоянно создаём новые вкусы и совершенствуем мастерство
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
