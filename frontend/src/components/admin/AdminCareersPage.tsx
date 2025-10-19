import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  Settings, 
  Users, 
  BarChart3, 
  FileText,
  Eye,
  Edit
} from 'lucide-react';
import VacancyManager from './VacancyManager';
import CareersSectionEditor from './CareersSectionEditor';

const AdminCareersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('vacancies');

  const stats = {
    totalVacancies: 12,
    activeVacancies: 8,
    applications: 45,
    newApplications: 3
  };

  return (
    <div className="p-6 space-y-6">
      {/* Заголовок и статистика */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Управление вакансиями</h1>
          <p className="text-muted-foreground">Управляйте вакансиями и настройками раздела</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Предварительный просмотр
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Экспорт данных
          </Button>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Всего вакансий</p>
                <p className="text-2xl font-bold">{stats.totalVacancies}</p>
              </div>
              <Briefcase className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Активных</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeVacancies}</p>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800">
                Активно
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Откликов</p>
                <p className="text-2xl font-bold">{stats.applications}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Новых откликов</p>
                <p className="text-2xl font-bold text-blue-600">{stats.newApplications}</p>
              </div>
              <Badge variant="default" className="bg-blue-100 text-blue-800">
                Новые
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Основной контент */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="vacancies" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Вакансии
          </TabsTrigger>
          <TabsTrigger value="section" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Настройки раздела
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Аналитика
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vacancies" className="space-y-4">
          <VacancyManager />
        </TabsContent>

        <TabsContent value="section" className="space-y-4">
          <CareersSectionEditor />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Аналитика вакансий</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Аналитика будет доступна в следующих версиях</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Быстрые действия */}
      <Card>
        <CardHeader>
          <CardTitle>Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Briefcase className="h-6 w-6" />
              <span>Добавить вакансию</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Edit className="h-6 w-6" />
              <span>Редактировать раздел</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Eye className="h-6 w-6" />
              <span>Предварительный просмотр</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCareersPage;
