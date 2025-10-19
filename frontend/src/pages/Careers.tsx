import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Briefcase, Heart } from "lucide-react";

interface Vacancy {
  id: number;
  title: string;
  location: string;
  type: string;
  schedule: string;
  description: string;
  requirements: string[];
  salary?: string;
  experience?: string;
  isActive: boolean;
}

interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
}

interface CareersData {
  heroTitle: string;
  heroDescription: string;
  benefits: Benefit[];
  contactTitle: string;
  contactDescription: string;
  contactButtonText: string;
  contactButtonLink: string;
}

const Careers = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [careersData, setCareersData] = useState<CareersData>({
    heroTitle: "Вакансии",
    heroDescription: "Присоединяйтесь к команде профессионалов! Мы ищем талантливых людей, которые разделяют нашу любовь к кондитерскому искусству.",
    benefits: [],
    contactTitle: "Не нашли подходящую вакансию?",
    contactDescription: "Отправьте нам свое резюме, и мы свяжемся с вами при появлении подходящих вакансий!",
    contactButtonText: "Связаться с нами",
    contactButtonLink: "/contact"
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCareersData();
  }, []);

  const loadCareersData = async () => {
    try {
      setIsLoading(true);
      // Здесь должен быть API запрос для загрузки данных
      // const response = await fetch('/api/careers');
      // const data = await response.json();
      
      // Временные данные для демонстрации
      const mockVacancies: Vacancy[] = [
        {
          id: 1,
          title: "Кондитер",
          location: "Москва, ул. Примерная, 1",
          type: "Полная занятость",
          schedule: "5/2, 9:00-18:00",
          description: "Ищем опытного кондитера для работы с тортами и десертами. Требуется опыт работы от 2 лет.",
          requirements: [
            "Опыт работы кондитером от 2 лет",
            "Знание технологий приготовления тортов",
            "Навыки работы с кремами и декором",
            "Ответственность и аккуратность"
          ],
          salary: "от 50 000 ₽",
          experience: "от 2 лет",
          isActive: true
        },
        {
          id: 2,
          title: "Помощник кондитера",
          location: "Москва, ул. Примерная, 1",
          type: "Полная занятость",
          schedule: "2/2, 8:00-20:00",
          description: "Приглашаем помощника кондитера в нашу дружную команду. Готовы обучить с нуля!",
          requirements: [
            "Желание учиться и развиваться",
            "Аккуратность и внимательность",
            "Ответственное отношение к работе",
            "Опыт приветствуется, но не обязателен"
          ],
          salary: "от 35 000 ₽",
          experience: "без опыта",
          isActive: true
        },
        {
          id: 3,
          title: "Продавец-кассир",
      location: "Москва, ул. Примерная, 1",
      type: "Полная занятость",
      schedule: "5/2, 10:00-19:00",
      description: "В наш магазин требуется продавец-кассир с опытом работы в сфере продаж кондитерских изделий.",
      requirements: [
        "Опыт работы продавцом от 1 года",
        "Грамотная речь и доброжелательность",
        "Навыки работы с кассой",
        "Знание 1С приветствуется"
      ]
    },
    {
      id: 4,
      title: "Менеджер по работе с клиентами",
      location: "Удаленно / Офис",
      type: "Полная занятость",
      schedule: "5/2, 10:00-19:00",
      description: "Ищем менеджера для работы с заказами и консультирования клиентов по индивидуальным тортам.",
      requirements: [
        "Опыт работы с клиентами от 1 года",
        "Отличные коммуникативные навыки",
        "Знание кондитерских изделий",
        "Умение работать в CRM-системах"
      ]
    }
  ];

  const benefits = [
    {
      title: "Достойная зарплата",
      description: "Конкурентная оплата труда и премии за результат"
    },
    {
      title: "Обучение",
      description: "Бесплатное обучение и повышение квалификации"
    },
    {
      title: "Дружный коллектив",
      description: "Молодая команда профессионалов своего дела"
    },
    {
      title: "Карьерный рост",
      description: "Возможности развития и продвижения внутри компании"
    },
    {
      title: "Скидки сотрудникам",
      description: "Скидка 30% на всю продукцию кондитерской"
    },
    {
      title: "График работы",
      description: "Удобный график без переработок и ночных смен"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Вакансии"
        description="Присоединяйтесь к команде Уездного кондитера! Актуальные вакансии кондитеров, помощников кондитеров, продавцов и менеджеров."
        keywords="вакансии кондитер, работа кондитером, вакансии кондитерская"
      />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-soft py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{careersData.heroTitle}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {careersData.heroDescription}
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        {careersData.benefits.length > 0 && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Почему стоит работать у нас?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {careersData.benefits.filter(benefit => benefit.isActive).map((benefit) => (
                  <Card key={benefit.id} className="text-center">
                    <CardHeader>
                      <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl">{benefit.icon}</span>
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Vacancies Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Актуальные вакансии</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {vacancies.filter(vacancy => vacancy.isActive).map((vacancy) => (
                <Card key={vacancy.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-2xl">{vacancy.title}</CardTitle>
                    <CardDescription className="text-base mt-2">{vacancy.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{vacancy.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <span>{vacancy.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{vacancy.schedule}</span>
                      </div>
                      {vacancy.salary && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {vacancy.salary}
                        </Badge>
                      )}
                      {vacancy.experience && (
                        <Badge variant="outline">
                          {vacancy.experience}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Требования:</h4>
                      <ul className="space-y-2">
                        {vacancy.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2 text-muted-foreground">
                            <span className="text-primary mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button className="w-full md:w-auto">
                      Откликнуться на вакансию
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{careersData.contactTitle}</h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {careersData.contactDescription}
            </p>
            <a 
              href={careersData.contactButtonLink} 
              className="inline-block bg-background text-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              {careersData.contactButtonText}
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
