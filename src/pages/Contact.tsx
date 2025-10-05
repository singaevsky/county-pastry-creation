import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Сообщение отправлено",
      description: "Мы свяжемся с вами в ближайшее время",
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Свяжитесь с нами любым удобным способом
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-8">Напишите нам</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ваше имя
                  </label>
                  <Input placeholder="Иван Иванов" required />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="ivan@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Телефон
                  </label>
                  <Input type="tel" placeholder="+7 (999) 123-45-67" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Сообщение
                  </label>
                  <Textarea
                    placeholder="Расскажите, чем мы можем вам помочь..."
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gradient-warm text-white"
                >
                  Отправить сообщение
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-8">Контактная информация</h2>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Адрес</h3>
                    <p className="text-muted-foreground">
                      ул. Кондитерская, д. 25
                      <br />
                      Москва, 101000
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Телефон</h3>
                    <p className="text-muted-foreground">
                      +7 (495) 123-45-67
                      <br />
                      +7 (495) 123-45-68
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Email</h3>
                    <p className="text-muted-foreground">
                      info@countypastry.ru
                      <br />
                      orders@countypastry.ru
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Режим работы
                    </h3>
                    <p className="text-muted-foreground">
                      Пн-Пт: 8:00 - 21:00
                      <br />
                      Сб-Вс: 9:00 - 20:00
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="bg-muted rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Приходите к нам!</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Посетите нашу кондитерскую, чтобы попробовать свежую выпечку и
              выбрать торт на любой вкус
            </p>
            <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
              <MapPin className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
