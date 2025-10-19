import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings, Users, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminCareersPage from '@/components/admin/AdminCareersPage';

const AdminCareers: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад к админке
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Управление вакансиями</h1>
                <p className="text-sm text-muted-foreground">
                  Редактирование раздела вакансий и управление контентом
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Настройки
              </Button>
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Отклики
              </Button>
              <Button size="sm">
                <Briefcase className="w-4 h-4 mr-2" />
                Добавить вакансию
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-2">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/admin" className="text-muted-foreground hover:text-foreground">
              Админка
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">Вакансии</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto">
        <AdminCareersPage />
      </div>
    </div>
  );
};

export default AdminCareers;
