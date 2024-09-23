"use client";

import { useData } from "@/app/context/FormContext";
import { useEffect, useState } from "react";
import TypeformEmbed from "./TypeformEmbed";

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
            console.log(result.data);
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
        <TypeformEmbed
          formUrl={`https://l5ha1tgm985.typeform.com/to/${data.id}`}
        />
      ) : (
        <p>
          No data available. Please return to the home page and load the data.
        </p>
      )}
    </div>
  );
};
