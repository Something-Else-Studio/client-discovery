/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldResponse, OpinionScaleField } from "@/utils/types";
import React, { useState } from "react";
import classNames from "classnames";

interface OpinionScaleProps {
  field: OpinionScaleField;
  onNext: (response: FieldResponse) => void;
}

const OpinionScale: React.FC<OpinionScaleProps> = ({ field, onNext }) => {
  const [value, setValue] = useState<number | null>(null);

  const handleSubmit = () => {
    if (value !== null) {
      const opinionScaleResponse = {
        field: { id: field.id },
        type: "number",
        number: value,
      };
      onNext(opinionScaleResponse);
    }
  };

  return (
    <div>
      <h2>{field.title}</h2>
      <div>
        {Array.from({ length: field.properties.steps }).map((_, index) => (
          <button key={index} onClick={() => setValue(index + 1)}>
            <p className={classNames(value === index + 1 && "text-yellow-400")}>
              {index + 1}
            </p>
          </button>
        ))}
      </div>
      <button onClick={handleSubmit} disabled={value === null}>
        Next
      </button>
    </div>
  );
};

export default OpinionScale;
