import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { Loader2, Cake, ShoppingBag, User } from "lucide-react";

interface CakeConfiguration {
  id: string;
  configuration: any;
  price: number;
  status: string;
  created_at: string;
}

interface Order {
  id: string;
  total_amount: number;
  status: string;
  created_at: string;
  order_items: any[];
}

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [cakeConfigs, setCakeConfigs] = useState<CakeConfiguration[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }
      
      setUser(user);
      await Promise.all([fetchCakeConfigs(user.id), fetchOrders(user.id)]);
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCakeConfigs = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('cake_configurations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCakeConfigs(data || []);
    } catch (error) {
      console.error('Error fetching configs:', error);
    }
  };

  const fetchOrders = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const deleteConfig = async (id: string) => {
    try {
      const { error } = await supabase
        .from('cake_configurations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCakeConfigs(cakeConfigs.filter(c => c.id !== id));
      toast({
        title: "Конфигурация удалена",
      });
    } catch (error) {
      console.error('Error deleting config:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить конфигурацию",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO 
        title="Личный кабинет | Уездный кондитер"
        description="Управляйте своими заказами, конфигурациями тортов и профилем"
        keywords="личный кабинет, профиль пользователя, мои заказы"
      />
      <Navbar />
      
      <section className="py-20 gradient-soft">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Личный кабинет</h1>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>

          <Tabs defaultValue="configs" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="configs">
                <Cake className="mr-2 h-4 w-4" />
                Конфигурации
              </TabsTrigger>
              <TabsTrigger value="orders">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Заказы
              </TabsTrigger>
              <TabsTrigger value="profile">
                <User className="mr-2 h-4 w-4" />
                Профиль
              </TabsTrigger>
            </TabsList>

            <TabsContent value="configs" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Мои конфигурации тортов</h2>
                <Button onClick={() => navigate("/cake-builder")}>
                  <Cake className="mr-2 h-4 w-4" />
                  Создать новый
                </Button>
              </div>

              {cakeConfigs.length === 0 ? (
                <Card className="p-12 text-center">
                  <Cake className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    У вас пока нет сохраненных конфигураций
                  </p>
                  <Button onClick={() => navigate("/cake-builder")}>
                    Создать первую конфигурацию
                  </Button>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {cakeConfigs.map((config) => (
                    <Card key={config.id} className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            Торт "{config.configuration.type}"
                          </h3>
                          <Badge variant={config.status === 'draft' ? 'secondary' : 'default'}>
                            {config.status === 'draft' ? 'Черновик' : 'Заказ оформлен'}
                          </Badge>
                        </div>
                        <p className="text-2xl font-bold text-primary">{config.price} ₽</p>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-4">
                        <div>
                          <p className="text-muted-foreground">Размер</p>
                          <p className="font-medium">{config.configuration.size}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Ярусы</p>
                          <p className="font-medium">{config.configuration.layers}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Вкус</p>
                          <p className="font-medium">{config.configuration.flavor}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Декор</p>
                          <p className="font-medium">{config.configuration.decoration}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => deleteConfig(config.id)}>
                          Удалить
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="orders" className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">История заказов</h2>
              
              {orders.length === 0 ? (
                <Card className="p-12 text-center">
                  <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    У вас пока нет заказов
                  </p>
                  <Button onClick={() => navigate("/products")}>
                    Перейти в каталог
                  </Button>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            Заказ #{order.id.slice(0, 8)}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary mb-2">
                            {order.total_amount} ₽
                          </p>
                          <Badge>{order.status}</Badge>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <p className="text-sm text-muted-foreground mb-2">Товары:</p>
                        {order.order_items?.map((item, idx) => (
                          <p key={idx} className="text-sm">
                            {item.quantity}x {item.product_title}
                          </p>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="profile" className="space-y-4">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Информация профиля</h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">ID пользователя</p>
                    <p className="font-mono text-sm">{user?.id}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Дата регистрации</p>
                    <p className="font-medium">
                      {new Date(user?.created_at).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <Button variant="outline" onClick={() => navigate("/")}>
                    Вернуться на главную
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;
