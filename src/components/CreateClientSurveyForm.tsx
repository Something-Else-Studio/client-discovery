"use client";

import { FormEvent, useRef, useState } from "react";
import { TextInput, TextInputRef } from "../elements/TextInput";
import genericFormBody from "../../build_form.json";
import { StandardButton } from "@/elements/StandardButton";
import { NewFormSuccessMessage } from "@/elements/NewFormSuccessMessage";

export const CreateClientSurveyForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formResult, setFormResult] = useState();

  const textInputRef = useRef<TextInputRef>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (textInputRef.current) {
      const inputValue = textInputRef.current.getValue();
      try {
        const response = await fetch("/api/create-form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientName: inputValue,
            formBody: genericFormBody,
          }),
        });

        const data = await response.json();
        if (data.success) {
          setFormResult(data.data);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="grid grid-rows-2 gap-y-8">
      <form
        onSubmit={(e: FormEvent) => handleSubmit(e)}
        className="flex gap-x-8"
      >
        <TextInput
          name="companyName"
          ref={textInputRef}
          userPrompt="Enter company name"
        />
        <StandardButton isLoading={loading} text="Create form" />
      </form>
      {formResult && <NewFormSuccessMessage />}
    </div>
  );
};
