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
  };
  type: string;
  choices?: {
    ids: string[];
    refs: string[];
    labels: string[];
  };
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

interface RankingData {
  option: string; // The label of the ranking option
  [key: `Rank ${number}`]: number; // Dynamic rank keys, like Rank 1, Rank 2, etc.
}

const FormDashboard: React.FC<FormDashboardProps> = ({ data }) => {
  const [opinionScaleData, setOpinionScaleData] = useState<
    { score: number; count: number }[]
  >([]);
  const [rankingData, setRankingData] = useState<RankingData[]>([]);

  useEffect(() => {
    // Process opinion scale data
    const opinionScaleCounts: { [key: number]: number } = {};

    // Process ranking data
    const rankingCounts: { [key: string]: { [rank: number]: number } } = {};

    data.forEach((response) => {
      response.answers.forEach((answer) => {
        if (
          answer.field.type === "opinion_scale" &&
          answer.number !== undefined
        ) {
          const score = answer.number;
          if (!opinionScaleCounts[score]) {
            opinionScaleCounts[score] = 0;
          }
          opinionScaleCounts[score]++;
        }

        if (answer.field.type === "ranking" && answer.choices) {
          answer.choices.labels.forEach((label, index) => {
            if (!rankingCounts[label]) {
              rankingCounts[label] = {};
            }
            const rank = index + 1;
            if (!rankingCounts[label][rank]) {
              rankingCounts[label][rank] = 0;
            }
            rankingCounts[label][rank]++;
          });
        }
      });
    });

    // Convert opinion scale counts to an array
    const opinionDataArray = Object.keys(opinionScaleCounts).map((key) => ({
      score: parseInt(key),
      count: opinionScaleCounts[parseInt(key)],
    }));

    // Convert ranking counts to an array
    const rankingDataArray = Object.keys(rankingCounts).map((option) => {
      const ranks = rankingCounts[option];
      const rankObj: RankingData = { option }; // Start with the option label
      for (let i = 1; i <= 10; i++) {
        rankObj[`Rank ${i}`] = ranks[i] || 0; // Add rank data (e.g., Rank 1, Rank 2)
      }
      return rankObj;
    });

    setOpinionScaleData(opinionDataArray);
    setRankingData(rankingDataArray);
  }, [data]);

  // Render Opinion Scale Chart
  const renderOpinionScaleChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={opinionScaleData}
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
  );

  // Render Ranking Chart (Stacked Bar Chart)
  const renderRankingChart = () => {
    const rankingKeys = Array.from({ length: 10 }, (_, i) => `Rank ${i + 1}`);

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={rankingData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="option" />
          <YAxis />
          <Tooltip />
          <Legend />
          {rankingKeys.map((key, i) => (
            <Bar
              key={i}
              dataKey={key}
              stackId="a"
              fill={`rgba(${75 + i * 15}, 192, 192, 0.6)`}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <PageContentContainer>
      <h1 className="text-2xl font-bold">Form Responses Dashboard</h1>

      <div className="my-4 p-4 bg-white shadow rounded">
        <h2 className="text-lg font-semibold">Opinion Scale Distribution</h2>
        {opinionScaleData.length > 0 ? (
          renderOpinionScaleChart()
        ) : (
          <p>No opinion scale data</p>
        )}
      </div>

      <div className="my-4 p-4 bg-white shadow rounded">
        <h2 className="text-lg font-semibold">Ranking Distribution</h2>
        {rankingData.length > 0 ? renderRankingChart() : <p>No ranking data</p>}
      </div>
    </PageContentContainer>
  );
};

export default FormDashboard;
