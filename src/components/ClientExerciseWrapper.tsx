/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import OpinionScale from "./form-questions/OpinionScale";
import LongText from "./form-questions/LongText";
import Ranking, { RankingField } from "./form-questions/Ranking";
import ProgressBar from "@/elements/ProgressBar";
import { FieldResponse, LongTextField, OpinionScaleField } from "@/utils/types";

export interface FormField {
  id: string;
  type: string;
  title: string;
  properties: any;
}

interface ClientExerciseWrapperProps {
  formId: string;
  fields: FormField[];
  onSubmit: (responses: any, formId: string) => Promise<void>;
}

const ClientExerciseWrapper: React.FC<ClientExerciseWrapperProps> = ({
  formId,
  fields,
  onSubmit,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<any>({});

  const handleNext = (response: FieldResponse) => {
    setResponses((prevResponses: any) => ({
      ...prevResponses,
      [fields[currentStep].id]: response,
    }));
    if (currentStep < fields.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      onSubmit(responses, formId);
    }
  };

  const renderField = () => {
    const field = fields[currentStep];
    switch (field.type) {
      case "opinion_scale":
        return (
          <OpinionScale
            field={field as OpinionScaleField}
            onNext={handleNext}
          />
        );
      case "long_text":
        return <LongText field={field as LongTextField} onNext={handleNext} />;
      case "ranking":
        return <Ranking field={field as RankingField} onNext={handleNext} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <ProgressBar currentStep={currentStep + 1} totalSteps={fields.length} />
      <div>{renderField()}</div>
    </div>
  );
};

export default ClientExerciseWrapper;
