"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export interface FormType {
  id: string;
  title: string;
  type: "quiz";
  settings: unknown;
  workspace: {
    href: string;
  };
  fields: Array<unknown>;
}

interface FormContextType {
  data: FormType | null;
  setData: (data: FormType | null) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<FormType | null>(null);

  return (
    <FormContext.Provider value={{ data, setData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useData must be used within a FormProvider");
  }
  return context;
};
