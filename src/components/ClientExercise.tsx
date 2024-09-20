"use client";

import { useData } from "@/app/context/FormContext";
import { useEffect, useState } from "react";

export const ClientExercise: React.FC<{ clientFormId: string }> = ({
  clientFormId,
}) => {
  const { data, setData } = useData();
  const [formsLoading, setFormsLoading] = useState(true);

  useEffect(() => {
    if (!data) {
      const retrieveLatestForm = async () => {
        try {
          const response = await fetch(
            `/api/retrieve-form-by-id/${clientFormId}`,
            {
              cache: "no-store",
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const result = await response.json();
          if (result.success) {
            setData(result.data);
          } else {
            console.error(result.error);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setFormsLoading(false);
        }
      };

      retrieveLatestForm();
    } else {
      setFormsLoading(false);
    }
  }, [data, setData, clientFormId]);

  if (formsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {data ? (
        <div>
          <h2>{data.id}</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>
          No data available. Please return to the home page and load the data.
        </p>
      )}
    </div>
  );
};
