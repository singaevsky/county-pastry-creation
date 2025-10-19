import React, { useState, useEffect } from 'react';
import { ProductSelection } from './ProductSelection';
import { FillingSelection } from './FillingSelection';
import { UploadDesign } from './UploadDesign';
import { Review } from './Review';
export default function WizardSteps({ steps, onFinish }) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => Math.min(prev + 1, steps.length - 1));
  const back = () => setCurrent((prev) => Math.max(prev - 1, 0));

  return (
    <div>
      <div>{steps[current]}</div>
      <button onClick={back} disabled={current === 0}>Back</button>
      {current < steps.length - 1 ? (
        <button onClick={next}>Next</button>
      ) : (
        <button onClick={onFinish}>Finish</button>
      )}
    </div>
  );
}

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
