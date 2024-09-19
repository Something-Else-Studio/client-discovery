import { useData } from "@/app/context/FormContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ActionButton } from "./ActionButton";

export const NewFormSuccessMessage: React.FC = () => {
  const [latestFormIdLoaded, setLatestFormIdLoaded] = useState(false);

  const { data, setData } = useData();
  const router = useRouter();

  useEffect(() => {
    const retrieveLatestForm = async () => {
      try {
        const response = await fetch("/api/retrieve-latest-form", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (data.success) {
          setData(data);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLatestFormIdLoaded(true);
      }
    };

    retrieveLatestForm();
  }, [setData]);

  const handleNavigation = () => {
    router.push("/brand-exercise");
  };

  return (
    <div>
      <p>Form created ✅</p>
      <span className="animate-pulse">
        {!latestFormIdLoaded ? "Retrieving new form..." : "Now ready to view"}
      </span>
      {latestFormIdLoaded && data && (
        <ActionButton onClickFunction={handleNavigation} />
      )}
    </div>
  );
};
