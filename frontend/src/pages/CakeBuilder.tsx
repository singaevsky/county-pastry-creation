import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import CakeBuilderForm from "@/components/CakeBuilderForm";

const CakeBuilder = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (config: any, price: number) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Требуется авторизация",
          description: "Войдите в систему, чтобы сохранить конфигурацию",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      const { error } = await supabase
        .from('cake_configurations')
        .insert({
          user_id: user.id,
          configuration: config,
          price: price,
          status: 'draft'
        });

      if (error) throw error;

      toast({
        title: "Успешно сохранено!",
        description: "Ваша конфигурация торта сохранена",
      });
      
      navigate("/profile");
    } catch (error) {
      console.error('Error saving configuration:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить конфигурацию",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="Конструктор тортов | Уездный кондитер"
        description="Создайте торт своей мечты с помощью нашего онлайн конструктора. Выберите размер, вкус, начинку и декор."
        keywords="конструктор тортов, заказать торт, индивидуальный торт, торт на заказ"
      />
      <Navbar />
      
      <section className="py-20 gradient-soft">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Конструктор тортов
            </h1>
            <p className="text-lg text-muted-foreground">
              Создайте торт своей мечты
            </p>
          </div>

          <Card className="p-8 shadow-elegant">
            <CakeBuilderForm onSubmit={handleSubmit} loading={loading} />
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CakeBuilder;
