"use client";

import FormDashboard from "@/components/FormDashboard";
import { PageContentContainer } from "@/elements/PageContentContainer";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Responses: React.FC = () => {
  const { id } = useParams() as { id: string };
  const [responseData, setResponseData] = useState();
  const [formDataLoading, setFormDataLoading] = useState(true);

  useEffect(() => {
    const retrieveResponses = async () => {
      try {
        const response = await fetch(`/api/retrieve-responses-by-id/${id}`, {
          cache: "no-store",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (result.success) {
          console.log(result);
          setResponseData(result.data);
        } else {
          console.error(result.error);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setFormDataLoading(false);
      }
    };

    retrieveResponses();
  }, [id]);
  return (
    <PageContentContainer>
      {responseData && <h1>{`Results for form with id: ${id}`}</h1>}
      {formDataLoading && <p>Loading...</p>}
      {responseData && <FormDashboard data={responseData} />}
    </PageContentContainer>
  );
};

export default Responses;
