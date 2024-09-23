import { FieldResponse, LongTextField } from "@/utils/types";
import React, { useState } from "react";

interface LongTextProps {
  field: LongTextField;
  onNext: (response: FieldResponse) => void;
}

const LongText: React.FC<LongTextProps> = ({ field, onNext }) => {
  const [value, setValue] = useState<string>("");

  const handleSubmit = () => {
    if (value.trim()) {
      const textResponse = {
        field: { id: field.id },
        type: "text",
        text: value,
      };
      onNext(textResponse);
    }
  };

  return (
    <div>
      <h2>{field.title}</h2>
      <textarea
        className="text-black"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={!value.trim()}>
        Next
      </button>
    </div>
  );
};

export default LongText;
