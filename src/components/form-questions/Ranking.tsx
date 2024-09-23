/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldResponse, TypeformFieldType } from "@/utils/types";
import React, { useState } from "react";

interface RankingFieldChoice {
  id: string;
  label: string;
  ref: string;
}

export interface RankingField {
  id: string;
  properties: {
    description: string;
    randomize: boolean;
    allow_multiple_selection: boolean;
    choices: RankingFieldChoice[];
  };
  ref: string;
  title: string;
  type: TypeformFieldType;
  validations: { required: false };
}

interface RankingProps {
  field: RankingField;
  onNext: (response: FieldResponse) => void;
}

const Ranking: React.FC<RankingProps> = ({ field, onNext }) => {
  const [ranking, setRanking] = useState<RankingFieldChoice[]>(
    field.properties.choices
  );

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newRanking = [...ranking];
    [newRanking[index], newRanking[index - 1]] = [
      newRanking[index - 1],
      newRanking[index],
    ];
    setRanking(newRanking);
  };

  const moveDown = (index: number) => {
    if (index === ranking.length - 1) return;
    const newRanking = [...ranking];
    [newRanking[index], newRanking[index + 1]] = [
      newRanking[index + 1],
      newRanking[index],
    ];
    setRanking(newRanking);
  };

  const handleSubmit = () => {
    const rankingResponse = {
      field: { id: field.id },
      type: "ranking",
      ranking: { labels: ranking.map((item) => item.label) },
    };
    onNext(rankingResponse);
  };

  return (
    <div>
      <h2>{field.title}</h2>
      <ul>
        {ranking.map((choice, index) => (
          <li key={choice.id}>
            <span>{choice.label}</span>
            <button onClick={() => moveUp(index)} disabled={index === 0}>
              ↑
            </button>
            <button
              onClick={() => moveDown(index)}
              disabled={index === ranking.length - 1}
            >
              ↓
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default Ranking;
