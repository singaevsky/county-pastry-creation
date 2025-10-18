import React, { useState, useEffect } from 'react';
import { ProductSelection } from './ProductSelection';
import { FillingSelection } from './FillingSelection';
import { UploadDesign } from './UploadDesign';

export const WizardSteps: React.FC = () => {
  const [step, setStep] = useState(1);
  const [product, setProduct] = useState('');
  const [fillings, setFillings] = useState<{ [id: number]: number }>({});
  const [designFile, setDesignFile] = useState('');

  return (
    <div className="wizard">
      {step === 1 && <ProductSelection selected={product} onSelect={setProduct} />}
      {step === 2 && <FillingSelection selected={fillings} onChange={setFillings} />}
      {step === 3 && <UploadDesign onUpload={setDesignFile} />}
      <div className="wizard-controls">
        {step > 1 && <button onClick={() => setStep(step - 1)}>Back</button>}
        {step < 3 && <button onClick={() => setStep(step + 1)}>Next</button>}
      </div>
    </div>
  );
};
