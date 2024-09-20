"use client";

import { ClientExercise } from "@/components/ClientExercise";
import { PageContentContainer } from "@/elements/PageContentContainer";
import { useParams } from "next/navigation";

export default function BrandExercise() {
  const { id } = useParams() as { id: string };
  return (
    <PageContentContainer>
      <h1>Brand Exercise</h1>
      {id && <ClientExercise clientFormId={id} />}
    </PageContentContainer>
  );
}
