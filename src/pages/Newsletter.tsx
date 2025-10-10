import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Mail, CheckCircle } from "lucide-react";

const newsletterSchema = z.object({
  email: z.string().email("Введите корректный email адрес"),
  name: z.string().min(2, "Имя должно содержать минимум 2 символа").optional(),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const Newsletter = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("newsletter_subscribers").insert([
        {
          email: data.email,
          name: data.name || null,
          subscribed_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Вы уже подписаны",
            description: "Этот email уже зарегистрирован в нашей рассылке",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      setIsSubscribed(true);
      toast({
        title: "Успешно подписались!",
        description: "Теперь вы будете получать наши новости и эксклюзивные предложения",
      });
      reset();
    } catch (error: any) {
      toast({
        title: "Ошибка подписки",
        description: error.message || "Попробуйте позже",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Подписка на новости"
        description="Подпишитесь на рассылку Уездного кондитера и получайте эксклюзивные рецепты, советы от профессионалов и специальные предложения"
        keywords="подписка на новости, рассылка кондитерской, новости кондитерской"
      />
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-20 bg-gradient-soft">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Подписка на новости
              </h1>
              <p className="text-xl text-muted-foreground">
                Будьте в курсе последних новостей, получайте эксклюзивные рецепты
                и специальные предложения первыми
              </p>
            </div>

            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-center">
                  {isSubscribed ? "Спасибо за подписку!" : "Присоединяйтесь к нам"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isSubscribed ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <p className="text-muted-foreground mb-6">
                      Проверьте свою почту для подтверждения подписки
                    </p>
                    <Button onClick={() => setIsSubscribed(false)} variant="outline">
                      Подписать другой email
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <Input
                        type="text"
                        placeholder="Ваше имя (необязательно)"
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Input
                        type="email"
                        placeholder="Ваш email"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Подписываемся..." : "Подписаться"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Подписываясь, вы соглашаетесь с нашей политикой
                      конфиденциальности. Вы можете отписаться в любое время.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Что вы получите
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Эксклюзивные рецепты</h3>
                  <p className="text-sm text-muted-foreground">
                    Получайте профессиональные рецепты, недоступные на сайте
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Специальные предложения</h3>
                  <p className="text-sm text-muted-foreground">
                    Первыми узнавайте об акциях и получайте персональные скидки
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Кондитерские советы</h3>
                  <p className="text-sm text-muted-foreground">
                    Профессиональные хитрости и секреты идеальной выпечки
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Newsletter;
