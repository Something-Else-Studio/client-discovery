"use client";

import { useData } from "@/app/context/FormContext";
import { useEffect, useState } from "react";
import TypeformEmbed from "./TypeformEmbed";

export const ClientExercise: React.FC<{ clientFormId: string }> = ({
  clientFormId,
}) => {
  const [formFetched, setFormFetched] = useState(false);
  const { data, setData } = useData();
  const [formLoading, setFormLoading] = useState(true);

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
            setFormFetched(true);
          } else {
            console.error(result.error);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setFormLoading(false);
        }
      };

      retrieveLatestForm();
    } else {
      setFormLoading(false);
    }
  }, [data, setData, clientFormId]);

  if (formLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {formFetched && (
        <TypeformEmbed
          formUrl={`https://l5ha1tgm985.typeform.com/to/${clientFormId}`}
          formId={clientFormId}
        />
      )}
      {formLoading && <div>Loading...</div>}
    </div>
  );
};
