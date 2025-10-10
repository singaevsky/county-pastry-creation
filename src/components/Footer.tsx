import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Уездный кондитер</h3>
            <p className="text-primary-foreground/80">
              Создаём вкусные воспоминания с 2023 года
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Магазин</h4>
            <ul className="space-y-2">
              <li><a href="/products" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Торты</a></li>
              <li><a href="/products" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Выпечка</a></li>
              <li><a href="/products" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Заказы на заказ</a></li>
              <li><a href="/cart" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Корзина</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">О нас</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Наша история</a></li>
              <li><a href="/recipes" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Рецепты</a></li>
              <li><a href="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Контакты</a></li>
              <li><a href="/careers" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Вакансии</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Мы в соцсетях</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2025 Уездный кондитер. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
