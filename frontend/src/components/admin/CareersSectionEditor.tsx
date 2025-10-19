import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Save, X, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
}

interface CareersSectionData {
  heroTitle: string;
  heroDescription: string;
  benefits: Benefit[];
  contactTitle: string;
  contactDescription: string;
  contactButtonText: string;
  contactButtonLink: string;
}

const CareersSectionEditor: React.FC = () => {
  const [sectionData, setSectionData] = useState<CareersSectionData>({
    heroTitle: "Вакансии",
    heroDescription: "Присоединяйтесь к команде профессионалов! Мы ищем талантливых людей, которые разделяют нашу любовь к кондитерскому искусству.",
    benefits: [
      {
        id: 1,
        title: "Конкурентная зарплата",
        description: "Мы предлагаем достойную оплату труда с возможностью роста",
        icon: "💰",
        isActive: true
      },
      {
        id: 2,
        title: "Обучение и развитие",
        description: "Постоянное повышение квалификации и карьерный рост",
        icon: "📚",
        isActive: true
      },
      {
        id: 3,
        title: "Дружный коллектив",
        description: "Работа в команде единомышленников",
        icon: "👥",
        isActive: true
      }
    ],
    contactTitle: "Не нашли подходящую вакансию?",
    contactDescription: "Отправьте нам свое резюме, и мы свяжемся с вами при появлении подходящих вакансий!",
    contactButtonText: "Связаться с нами",
    contactButtonLink: "/contact"
  });

  const [isEditingBenefit, setIsEditingBenefit] = useState<Benefit | null>(null);
  const [isBenefitDialogOpen, setIsBenefitDialogOpen] = useState(false);
  const [benefitForm, setBenefitForm] = useState({
    title: '',
    description: '',
    icon: ''
  });
  const { toast } = useToast();

  const handleSaveSection = async () => {
    try {
      // Здесь должен быть API запрос для сохранения
      // await fetch('/api/careers-section', { method: 'PUT', body: JSON.stringify(sectionData) });
      
      toast({
        title: "Успешно",
        description: "Раздел вакансий обновлен"
      });
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить изменения",
        variant: "destructive"
      });
    }
  };

  const handleAddBenefit = () => {
    setIsEditingBenefit(null);
    setBenefitForm({ title: '', description: '', icon: '' });
    setIsBenefitDialogOpen(true);
  };

  const handleEditBenefit = (benefit: Benefit) => {
    setIsEditingBenefit(benefit);
    setBenefitForm({
      title: benefit.title,
      description: benefit.description,
      icon: benefit.icon
    });
    setIsBenefitDialogOpen(true);
  };

  const handleSaveBenefit = () => {
    if (isEditingBenefit) {
      // Обновление существующего преимущества
      setSectionData(prev => ({
        ...prev,
        benefits: prev.benefits.map(b => 
          b.id === isEditingBenefit.id 
            ? { ...b, ...benefitForm }
            : b
        )
      }));
    } else {
      // Добавление нового преимущества
      const newBenefit: Benefit = {
        id: Date.now(),
        ...benefitForm,
        isActive: true
      };
      setSectionData(prev => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit]
      }));
    }
    
    setIsBenefitDialogOpen(false);
    toast({
      title: "Успешно",
      description: "Преимущество сохранено"
    });
  };

  const handleDeleteBenefit = (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить это преимущество?')) {
      setSectionData(prev => ({
        ...prev,
        benefits: prev.benefits.filter(b => b.id !== id)
      }));
      toast({
        title: "Успешно",
        description: "Преимущество удалено"
      });
    }
  };

  const handleToggleBenefit = (id: number) => {
    setSectionData(prev => ({
      ...prev,
      benefits: prev.benefits.map(b => 
        b.id === id ? { ...b, isActive: !b.isActive } : b
      )
    }));
  };

  return (
    <div className="space-y-6">
      {/* Редактирование Hero секции */}
      <Card>
        <CardHeader>
          <CardTitle>Hero секция</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="heroTitle">Заголовок</Label>
            <Input
              id="heroTitle"
              value={sectionData.heroTitle}
              onChange={(e) => setSectionData(prev => ({ ...prev, heroTitle: e.target.value }))}
              placeholder="Заголовок секции"
            />
          </div>
          <div>
            <Label htmlFor="heroDescription">Описание</Label>
            <Textarea
              id="heroDescription"
              value={sectionData.heroDescription}
              onChange={(e) => setSectionData(prev => ({ ...prev, heroDescription: e.target.value }))}
              placeholder="Описание секции"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Редактирование преимуществ */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Преимущества работы</CardTitle>
            <Button onClick={handleAddBenefit}>
              <Plus className="w-4 h-4 mr-2" />
              Добавить преимущество
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sectionData.benefits.map((benefit) => (
              <Card key={benefit.id} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{benefit.icon}</span>
                        <h3 className="text-lg font-semibold">{benefit.title}</h3>
                        <Badge variant={benefit.isActive ? "default" : "secondary"}>
                          {benefit.isActive ? "Активно" : "Неактивно"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditBenefit(benefit)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleBenefit(benefit.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteBenefit(benefit.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Редактирование контактной секции */}
      <Card>
        <CardHeader>
          <CardTitle>Контактная секция</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="contactTitle">Заголовок</Label>
            <Input
              id="contactTitle"
              value={sectionData.contactTitle}
              onChange={(e) => setSectionData(prev => ({ ...prev, contactTitle: e.target.value }))}
              placeholder="Заголовок контактной секции"
            />
          </div>
          <div>
            <Label htmlFor="contactDescription">Описание</Label>
            <Textarea
              id="contactDescription"
              value={sectionData.contactDescription}
              onChange={(e) => setSectionData(prev => ({ ...prev, contactDescription: e.target.value }))}
              placeholder="Описание контактной секции"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contactButtonText">Текст кнопки</Label>
              <Input
                id="contactButtonText"
                value={sectionData.contactButtonText}
                onChange={(e) => setSectionData(prev => ({ ...prev, contactButtonText: e.target.value }))}
                placeholder="Текст кнопки"
              />
            </div>
            <div>
              <Label htmlFor="contactButtonLink">Ссылка кнопки</Label>
              <Input
                id="contactButtonLink"
                value={sectionData.contactButtonLink}
                onChange={(e) => setSectionData(prev => ({ ...prev, contactButtonLink: e.target.value }))}
                placeholder="/contact"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Кнопка сохранения */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSection} size="lg">
          <Save className="w-4 h-4 mr-2" />
          Сохранить все изменения
        </Button>
      </div>

      {/* Диалог редактирования преимущества */}
      <Dialog open={isBenefitDialogOpen} onOpenChange={setIsBenefitDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditingBenefit ? 'Редактировать преимущество' : 'Добавить преимущество'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="benefitTitle">Название</Label>
              <Input
                id="benefitTitle"
                value={benefitForm.title}
                onChange={(e) => setBenefitForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Название преимущества"
              />
            </div>
            <div>
              <Label htmlFor="benefitDescription">Описание</Label>
              <Textarea
                id="benefitDescription"
                value={benefitForm.description}
                onChange={(e) => setBenefitForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Описание преимущества"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="benefitIcon">Иконка (эмодзи)</Label>
              <Input
                id="benefitIcon"
                value={benefitForm.icon}
                onChange={(e) => setBenefitForm(prev => ({ ...prev, icon: e.target.value }))}
                placeholder="💰"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsBenefitDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleSaveBenefit}>
              <Save className="w-4 h-4 mr-2" />
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CareersSectionEditor;
