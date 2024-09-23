/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useData } from "@/app/context/FormContext";
import { useEffect, useState } from "react";
import { FormField } from "./ClientExerciseWrapper";
import ClientExerciseWrapper from "./ClientExerciseWrapper";
import { FieldResponse } from "@/utils/types";

export const ClientExercise: React.FC<{ clientFormId: string }> = ({
  clientFormId,
}) => {
  const { data, setData } = useData();
  const [formsLoading, setFormsLoading] = useState(true);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

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

  const handleSubmit = async (responses: FieldResponse[], formId: string) => {
    setSubmissionLoading(true);

    const responseBody = {
      form_id: formId,
      answers: Object.values(responses),
    };

    try {
      const response = await fetch("/api/post-form-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(responseBody),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccessful(true);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmissionLoading(false);
    }
  };

  return (
    <div>
      {data ? (
        <ClientExerciseWrapper
          formId={clientFormId}
          fields={data.fields as FormField[]}
          onSubmit={handleSubmit}
        />
      ) : (
        <p>
          No data available. Please return to the home page and load the data.
        </p>
      )}
    </div>
  );
};
