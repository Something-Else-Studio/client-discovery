import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PageContentContainer } from "@/elements/PageContentContainer";

interface Answer {
  field: {
    id: string;
    type: string;
    ref: string;
    title: string;
  };
  type: string;
  number?: number;
}

interface ResponseData {
  landing_id: string;
  response_id: string;
  answers: Answer[];
}

interface FormDashboardProps {
  data: ResponseData[];
}

interface OpinionScaleData {
  questionId: string;
  title: string;
  data: { score: number; count: number }[];
}

const FormDashboard: React.FC<FormDashboardProps> = ({ data }) => {
  const [opinionScaleData, setOpinionScaleData] = useState<OpinionScaleData[]>(
    []
  );

  useEffect(() => {
    const opinionDataMap: {
      [key: string]: { title: string; scores: { [key: number]: number } };
    } = {};

    // Loop through each response and answer to collect opinion scale data
    data.forEach((response) => {
      response.answers.forEach((answer) => {
        if (
          answer.field.type === "opinion_scale" &&
          answer.number !== undefined
        ) {
          const questionId = answer.field.id;
          const score = answer.number;

          if (!opinionDataMap[questionId]) {
            opinionDataMap[questionId] = {
              title: answer.field.ref,
              scores: {},
            };
          }

          if (!opinionDataMap[questionId].scores[score]) {
            opinionDataMap[questionId].scores[score] = 0;
          }

          opinionDataMap[questionId].scores[score]++;
        }
      });
    });

    console.log("opinionDataMap:", opinionDataMap);

    // Convert the opinionDataMap to an array suitable for rendering
    const opinionDataArray: OpinionScaleData[] = Object.keys(
      opinionDataMap
    ).map((questionId) => {
      const scores = opinionDataMap[questionId].scores;
      return {
        questionId,
        title: opinionDataMap[questionId].title,
        data: Object.keys(scores).map((score) => ({
          score: parseInt(score),
          count: scores[parseInt(score)],
        })),
      };
    });

    setOpinionScaleData(opinionDataArray);
  }, [data]);

  // Function to render a chart for a given opinion scale question
  const renderOpinionScaleChart = (opinionData: OpinionScaleData) => {
    console.log("Rendering chart for:", opinionData.title);
    console.log("Chart data:", opinionData.data);
    return (
      <div
        key={opinionData.questionId}
        className="my-4 p-4 bg-white shadow rounded"
      >
        <h2 className="text-lg font-semibold">{opinionData.title}</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={opinionData.data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="score" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <PageContentContainer>
      <h1 className="text-2xl font-bold">Form Responses Dashboard</h1>

      {opinionScaleData.length > 0 ? (
        // Render a chart for each opinion scale question
        opinionScaleData.map((opinionData) =>
          renderOpinionScaleChart(opinionData)
        )
      ) : (
        <div className="my-4 p-4 bg-white shadow rounded">
          <h2 className="text-lg font-semibold">Opinion Scale Distribution</h2>
          <p>No opinion scale data</p>
        </div>
      )}
    </PageContentContainer>
  );
};

export default FormDashboard;
