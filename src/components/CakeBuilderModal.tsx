import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import CakeBuilderForm from "./CakeBuilderForm";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface CakeBuilderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CakeBuilderModal = ({ open, onOpenChange }: CakeBuilderModalProps) => {
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
        onOpenChange(false);
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
      
      onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Конструктор тортов</DialogTitle>
          <DialogDescription>
            Создайте торт своей мечты
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-4">
          <CakeBuilderForm onSubmit={handleSubmit} loading={loading} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CakeBuilderModal;
