"use client";
import { useData } from "../context/FormContext";

export default function NewPage() {
  const { data } = useData();

  return (
    <div>
      <h1>Brand Exercise</h1>

      {data ? (
        <div>
          <h2>Data from API:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>
          No data available. Please return to the home page and load the data.
        </p>
      )}
    </div>
  );
}
