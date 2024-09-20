import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ActionButton } from "./ActionButton";

export const NewFormSuccessMessage: React.FC = () => {
  const [latestFormIdLoaded, setLatestFormIdLoaded] = useState(false);
  const [latestFormId, setLatestFormId] = useState<string>();

  const router = useRouter();

  useEffect(() => {
    const retrieveLatestForm = async () => {
      try {
        const response = await fetch("/api/retrieve-latest-form", {
          cache: "no-store",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const latestFormData = await response.json();
        console.log(latestFormData);
        setLatestFormId(latestFormData.data.id);
      } catch (error) {
        console.error(error);
      } finally {
        setLatestFormIdLoaded(true);
      }
    };

    retrieveLatestForm();
  }, []);

  const handleNavigation = () => {
    router.push(`/brand-exercise/${latestFormId}`);
  };

  return (
    <div>
      <p>Form created ✅</p>
      <span className="animate-pulse">
        {!latestFormIdLoaded ? "Retrieving new form..." : "Now ready to view"}
      </span>
      {latestFormIdLoaded && latestFormId && (
        <ActionButton onClickFunction={handleNavigation} />
      )}
    </div>
  );
};
