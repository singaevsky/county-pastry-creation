import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

interface CakeConfig {
  type: string;
  size: string;
  layers: string;
  flavor: string;
  filling: string;
  frosting: string;
  decoration: string;
  text: string;
  specialRequests: string;
}

const CakeBuilder = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<CakeConfig>({
    type: "birthday",
    size: "medium",
    layers: "2",
    flavor: "vanilla",
    filling: "cream",
    frosting: "buttercream",
    decoration: "flowers",
    text: "",
    specialRequests: "",
  });

  const calculatePrice = () => {
    let basePrice = 2000;
    
    // Size multiplier
    const sizeMultipliers = { small: 1, medium: 1.5, large: 2, extra: 3 };
    basePrice *= sizeMultipliers[config.size as keyof typeof sizeMultipliers];
    
    // Layers
    basePrice += parseInt(config.layers) * 500;
    
    // Premium options
    if (config.frosting === "ganache") basePrice += 500;
    if (config.decoration === "custom") basePrice += 1000;
    
    return Math.round(basePrice);
  };

  const handleSave = async () => {
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
          price: calculatePrice(),
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
            <div className="space-y-8">
              {/* Тип торта */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Тип торта</Label>
                <RadioGroup value={config.type} onValueChange={(value) => setConfig({...config, type: value})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="birthday" id="birthday" />
                    <Label htmlFor="birthday">День рождения</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="wedding" id="wedding" />
                    <Label htmlFor="wedding">Свадебный</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="anniversary" id="anniversary" />
                    <Label htmlFor="anniversary">Юбилей</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="custom" />
                    <Label htmlFor="custom">Особый случай</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Размер */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Размер</Label>
                <Select value={config.size} onValueChange={(value) => setConfig({...config, size: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Маленький (6-8 порций)</SelectItem>
                    <SelectItem value="medium">Средний (10-12 порций)</SelectItem>
                    <SelectItem value="large">Большой (15-20 порций)</SelectItem>
                    <SelectItem value="extra">Очень большой (25+ порций)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Количество ярусов */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Количество ярусов</Label>
                <Select value={config.layers} onValueChange={(value) => setConfig({...config, layers: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 ярус</SelectItem>
                    <SelectItem value="2">2 яруса</SelectItem>
                    <SelectItem value="3">3 яруса</SelectItem>
                    <SelectItem value="4">4 яруса</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Вкус коржей */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Вкус коржей</Label>
                <Select value={config.flavor} onValueChange={(value) => setConfig({...config, flavor: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vanilla">Ванильный</SelectItem>
                    <SelectItem value="chocolate">Шоколадный</SelectItem>
                    <SelectItem value="strawberry">Клубничный</SelectItem>
                    <SelectItem value="lemon">Лимонный</SelectItem>
                    <SelectItem value="red-velvet">Красный бархат</SelectItem>
                    <SelectItem value="carrot">Морковный</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Начинка */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Начинка</Label>
                <Select value={config.filling} onValueChange={(value) => setConfig({...config, filling: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cream">Сливочный крем</SelectItem>
                    <SelectItem value="chocolate-cream">Шоколадный крем</SelectItem>
                    <SelectItem value="fruit">Фруктовое желе</SelectItem>
                    <SelectItem value="custard">Заварной крем</SelectItem>
                    <SelectItem value="caramel">Карамель</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Покрытие */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Покрытие</Label>
                <Select value={config.frosting} onValueChange={(value) => setConfig({...config, frosting: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buttercream">Масляный крем</SelectItem>
                    <SelectItem value="ganache">Ганаш (+500₽)</SelectItem>
                    <SelectItem value="fondant">Мастика</SelectItem>
                    <SelectItem value="cream-cheese">Крем-чиз</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Декор */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Декор</Label>
                <Select value={config.decoration} onValueChange={(value) => setConfig({...config, decoration: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flowers">Цветы из крема</SelectItem>
                    <SelectItem value="fruits">Свежие фрукты</SelectItem>
                    <SelectItem value="chocolate">Шоколадные элементы</SelectItem>
                    <SelectItem value="berries">Ягоды</SelectItem>
                    <SelectItem value="custom">Индивидуальный (+1000₽)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Надпись */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Надпись на торте</Label>
                <Input
                  placeholder="Например: С Днем Рождения!"
                  value={config.text}
                  onChange={(e) => setConfig({...config, text: e.target.value})}
                  maxLength={50}
                />
              </div>

              {/* Особые пожелания */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Особые пожелания</Label>
                <Textarea
                  placeholder="Опишите дополнительные пожелания..."
                  value={config.specialRequests}
                  onChange={(e) => setConfig({...config, specialRequests: e.target.value})}
                  rows={4}
                />
              </div>

              {/* Цена и кнопка */}
              <div className="pt-6 border-t space-y-4">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">Ориентировочная стоимость</p>
                  <p className="text-4xl font-bold text-primary">{calculatePrice()} ₽</p>
                </div>
                
                <Button 
                  onClick={handleSave} 
                  disabled={loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Сохранение...
                    </>
                  ) : (
                    "Сохранить конфигурацию"
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CakeBuilder;
