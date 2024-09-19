"use client";
import { ChangeEvent, forwardRef, useImperativeHandle, useState } from "react";

export interface TextInputRef {
  getValue: () => string;
}

export const TextInput = forwardRef<
  TextInputRef,
  { userPrompt: string; name: string }
>(({ userPrompt, name }, ref) => {
  const [value, setValue] = useState<string>("");

  useImperativeHandle(ref, () => ({
    getValue: () => value,
  }));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <label htmlFor={name} className="relative">
      <p className="text-base absolute -top-8">{userPrompt}</p>
      <input
        type="text"
        name={name}
        className="bg-transparent
        rounded-full border border-black/[.08] dark:border-white/[.145] text-sm sm:text-base px-4 py-2 sm:min-w-40 italic h-16"
        required
        value={value}
        onChange={handleChange}
        placeholder="Company"
      />
    </label>
  );
});

TextInput.displayName = "TextInput";
