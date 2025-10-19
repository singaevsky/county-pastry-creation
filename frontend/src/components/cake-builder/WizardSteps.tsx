import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Steps } from '@/components/ui/steps'; // shadcn-ui stepper
import { ProductSelection } from './ProductSelection';
import { UploadDesign } from './UploadDesign';
import { ColorSelection } from './ColorSelection';
import { FillingSelection } from './FillingSelection';
import { TierSelection } from './TierSelection';
import { UploadSketch } from './UploadSketch';
import { PreviewPrice } from './PreviewPrice';
import { api } from '@/services/api';
import { useProducts } from '@/hooks/useProducts';
import { ProductType } from '@/types';

const schema = z.object({
  productType: z.nativeEnum(ProductType),
  designPhotos: z.array(z.string().url()).max(3).optional(),
  colors: z.array(z.string()).max(2),
  fillings: z.array(z.string()).max(5),
  tiers: z.number().min(1).max(5),
  sketchUrl: z.string().url().optional(),
});

type FormData = z.infer<typeof schema>;

export const WizardSteps: React.FC = () => {
  const methods = useForm<FormData>({ resolver: zodResolver(schema) });
  const [currentStep, setCurrentStep] = useState(0);
  const [price, setPrice] = useState<number | null>(null);
  const [maxFillings, setMaxFillings] = useState(5);
  const [maxTiers, setMaxTiers] = useState(5);
  const { data: products } = useProducts();

  useEffect(() => {
    const productType = methods.watch('productType');
    if (productType && products) {
      const selectedProduct = products.find(p => p.type === productType);
      if (selectedProduct) {
        setMaxFillings(selectedProduct.maxFillings);
        setMaxTiers(selectedProduct.maxTiers);
        // Динамическая валидация: обновить schema, но для simplicity - check in onNext
      }
    }
  }, [methods.watch('productType'), products]);

  const steps = [
    { title: 'Изделие', component: <ProductSelection /> },
    { title: 'Дизайн', component: <UploadDesign /> },
    { title: 'Цвета', component: <ColorSelection /> },
    { title: 'Начинки', component: <FillingSelection /> },
    { title: 'Ярусы', component: <TierSelection /> },
    { title: 'Эскиз', component: <UploadSketch /> },
    { title: 'Предпросмотр', component: <PreviewPrice price={price} /> },
  ];

  const onNext = async () => {
    const isValid = await methods.trigger();
    if (isValid && currentStep < steps.length - 1) {
      const data = methods.getValues();
      // Динамическая проверка
      if (data.fillings.length > maxFillings) {
        methods.setError('fillings', { message: `Max ${maxFillings} fillings for ${data.productType}` });
        return;
      }
      if (data.tiers > maxTiers) {
        methods.setError('tiers', { message: `Max ${maxTiers} tiers for ${data.productType}` });
        return;
      }
      // Calc price
      try {
        const res = await api.post('/pricing/calculate', data);
        setPrice(res.data.price);
      } catch (err) {
        console.error('Pricing error:', err);
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const onPrev = () => currentStep > 0 && setCurrentStep(currentStep - 1);

  const onSubmit = async (data: FormData) => {
    const jsonParams = JSON.stringify(data);
    await api.post('/orders/create', { params: jsonParams });
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
