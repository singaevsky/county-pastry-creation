import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Steps } from '@/components/ui/steps'; // shadcn-ui stepper
import { UploadSketch } from './UploadSketch';
import { ColorSelection } from './ColorSelection';
import { FillingSelection } from './FillingSelection';
import { TierSelection } from './TierSelection';
import { PreviewPrice } from './PreviewPrice';
import { api } from '@/services/api'; // Axios instance

const schema = z.object({
  sketchUrl: z.string().optional(),
  colors: z.array(z.string()).max(2),
  fillings: z.array(z.string()).max(3),
  tiers: z.number().min(1).max(5),
});

type FormData = z.infer<typeof schema>;

export const WizardSteps: React.FC = () => {
  const methods = useForm<FormData>({ resolver: zodResolver(schema) });
  const [currentStep, setCurrentStep] = useState(0);
  const [price, setPrice] = useState<number | null>(null);

  const steps = [
    { title: 'Эскиз', component: <UploadSketch /> },
    { title: 'Цвета', component: <ColorSelection /> },
    { title: 'Начинки', component: <FillingSelection /> },
    { title: 'Ярусы', component: <TierSelection /> },
    { title: 'Предпросмотр', component: <PreviewPrice price={price} /> },
  ];

  const onNext = async () => {
    const isValid = await methods.trigger();
    if (isValid && currentStep < steps.length - 1) {
      // Calc price on step change
      const data = methods.getValues();
      try {
        const res = await api.post('/pricing/calculate', { params: data });
        setPrice(res.data.price);
      } catch (err) {
        console.error('Pricing error:', err);
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const onPrev = () => currentStep > 0 && setCurrentStep(currentStep - 1);

  const onSubmit = async (data: FormData) => {
    // Serialize to JSON and create order
    const jsonParams = JSON.stringify(data);
    await api.post('/orders/create', { params: jsonParams });
    // Redirect to payment
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <Steps current={currentStep} steps={steps.map(s => s.title)} />
        <div className="p-4">{steps[currentStep].component}</div>
        <div className="flex justify-between">
          <Button type="button" onClick={onPrev} variant="outline">Назад</Button>
          {currentStep === steps.length - 1 ? (
            <Button type="submit">Создать заказ</Button>
          ) : (
            <Button type="button" onClick={onNext}>Далее</Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
