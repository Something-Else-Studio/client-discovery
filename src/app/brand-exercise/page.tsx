"use client";

import { ClientExercise } from "@/components/ClientExercise";
import { PageContentContainer } from "@/elements/PageContentContainer";
import { StandardButton } from "@/elements/StandardButton";
import { TextInput, TextInputRef } from "@/elements/TextInput";
import { FormEvent, useRef, useState } from "react";

export default function BrandExercise() {
  const textInputRef = useRef<TextInputRef>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <PageContentContainer>
      <h1>Brand Exercise</h1>
      <form
        onSubmit={(e: FormEvent) => handleSubmit(e)}
        className="flex gap-x-8"
      >
        <TextInput
          userPrompt="Enter your company's unique ID"
          name="clientFormId"
          ref={textInputRef}
        />
        <StandardButton text="Submit" />
      </form>
      {formSubmitted && textInputRef.current && (
        <ClientExercise clientFormId={textInputRef.current.getValue()} />
      )}
    </PageContentContainer>
  );
}
