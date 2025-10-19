import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Eye, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  createdAt: string;
  updatedAt: string;
}

interface VacancyFormData {
  title: string;
  location: string;
  type: string;
  schedule: string;
  description: string;
  requirements: string[];
  salary: string;
  experience: string;
  isActive: boolean;
}

const VacancyManager: React.FC = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);
  const [formData, setFormData] = useState<VacancyFormData>({
    title: '',
    location: '',
    type: '',
    schedule: '',
    description: '',
    requirements: [''],
    salary: '',
    experience: '',
    isActive: true
  });
  const { toast } = useToast();

  // Загрузка вакансий
  useEffect(() => {
    loadVacancies();
  }, []);

  const loadVacancies = async () => {
    try {
      setIsLoading(true);
      // Здесь должен быть API запрос
      // const response = await fetch('/api/vacancies');
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
          isActive: true,
          createdAt: "2024-01-15",
          updatedAt: "2024-01-15"
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
          isActive: true,
          createdAt: "2024-01-10",
          updatedAt: "2024-01-10"
        }
      ];
      
      setVacancies(mockVacancies);
    } catch (error) {
      console.error('Ошибка загрузки вакансий:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить вакансии",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateVacancy = () => {
    setEditingVacancy(null);
    setFormData({
      title: '',
      location: '',
      type: '',
      schedule: '',
      description: '',
      requirements: [''],
      salary: '',
      experience: '',
      isActive: true
    });
    setIsDialogOpen(true);
  };

  const handleEditVacancy = (vacancy: Vacancy) => {
    setEditingVacancy(vacancy);
    setFormData({
      title: vacancy.title,
      location: vacancy.location,
      type: vacancy.type,
      schedule: vacancy.schedule,
      description: vacancy.description,
      requirements: vacancy.requirements.length > 0 ? vacancy.requirements : [''],
      salary: vacancy.salary || '',
      experience: vacancy.experience || '',
      isActive: vacancy.isActive
    });
    setIsDialogOpen(true);
  };

  const handleSaveVacancy = async () => {
    try {
      if (editingVacancy) {
        // Обновление существующей вакансии
        const updatedVacancy = {
          ...editingVacancy,
          ...formData,
          updatedAt: new Date().toISOString()
        };
        
        setVacancies(prev => 
          prev.map(v => v.id === editingVacancy.id ? updatedVacancy : v)
        );
        
        toast({
          title: "Успешно",
          description: "Вакансия обновлена"
        });
      } else {
        // Создание новой вакансии
        const newVacancy: Vacancy = {
          id: Date.now(),
          ...formData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        setVacancies(prev => [newVacancy, ...prev]);
        
        toast({
          title: "Успешно",
          description: "Вакансия создана"
        });
      }
      
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Ошибка сохранения вакансии:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить вакансию",
        variant: "destructive"
      });
    }
  };

  const handleDeleteVacancy = async (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить эту вакансию?')) {
      try {
        setVacancies(prev => prev.filter(v => v.id !== id));
        toast({
          title: "Успешно",
          description: "Вакансия удалена"
        });
      } catch (error) {
        console.error('Ошибка удаления вакансии:', error);
        toast({
          title: "Ошибка",
          description: "Не удалось удалить вакансию",
          variant: "destructive"
        });
      }
    }
  };

  const handleToggleActive = async (id: number) => {
    try {
      setVacancies(prev => 
        prev.map(v => 
          v.id === id 
            ? { ...v, isActive: !v.isActive, updatedAt: new Date().toISOString() }
            : v
        )
      );
      
      toast({
        title: "Успешно",
        description: "Статус вакансии изменен"
      });
    } catch (error) {
      console.error('Ошибка изменения статуса:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось изменить статус вакансии",
        variant: "destructive"
      });
    }
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }));
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Загрузка вакансий...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Управление вакансиями</CardTitle>
            <Button onClick={handleCreateVacancy}>
              <Plus className="w-4 h-4 mr-2" />
              Добавить вакансию
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vacancies.map((vacancy) => (
              <Card key={vacancy.id} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{vacancy.title}</h3>
                      <p className="text-sm text-muted-foreground">{vacancy.location}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant={vacancy.isActive ? "default" : "secondary"}>
                          {vacancy.isActive ? "Активна" : "Неактивна"}
                        </Badge>
                        <Badge variant="outline">{vacancy.type}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditVacancy(vacancy)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleActive(vacancy.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteVacancy(vacancy.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {vacancy.description}
                  </p>
                  
                  <div className="text-xs text-muted-foreground">
                    Обновлено: {new Date(vacancy.updatedAt).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Диалог создания/редактирования вакансии */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingVacancy ? 'Редактировать вакансию' : 'Создать вакансию'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Название должности</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Например: Кондитер"
                />
              </div>
              <div>
                <Label htmlFor="location">Местоположение</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Например: Москва, ул. Примерная, 1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Тип занятости</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Полная занятость">Полная занятость</SelectItem>
                    <SelectItem value="Частичная занятость">Частичная занятость</SelectItem>
                    <SelectItem value="Стажировка">Стажировка</SelectItem>
                    <SelectItem value="Удаленная работа">Удаленная работа</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="schedule">График работы</Label>
                <Input
                  id="schedule"
                  value={formData.schedule}
                  onChange={(e) => setFormData(prev => ({ ...prev, schedule: e.target.value }))}
                  placeholder="Например: 5/2, 9:00-18:00"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="salary">Зарплата</Label>
                <Input
                  id="salary"
                  value={formData.salary}
                  onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                  placeholder="Например: от 50 000 ₽"
                />
              </div>
              <div>
                <Label htmlFor="experience">Опыт работы</Label>
                <Input
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                  placeholder="Например: от 2 лет"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Подробное описание вакансии..."
                rows={3}
              />
            </div>

            <div>
              <Label>Требования</Label>
              <div className="space-y-2">
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={req}
                      onChange={(e) => updateRequirement(index, e.target.value)}
                      placeholder="Введите требование..."
                    />
                    {formData.requirements.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeRequirement(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addRequirement}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить требование
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="rounded"
                title="Активность вакансии"
              />
              <Label htmlFor="isActive">Вакансия активна</Label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleSaveVacancy}>
              <Save className="w-4 h-4 mr-2" />
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VacancyManager;
