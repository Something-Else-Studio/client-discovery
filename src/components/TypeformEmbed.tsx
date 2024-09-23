import { Widget } from "@typeform/embed-react";
import "@typeform/embed/build/css/widget.css";
import { useRouter } from "next/navigation";

interface TypeformEmbedProps {
  formUrl: string;
}

const TypeformEmbed: React.FC<TypeformEmbedProps> = ({ formUrl }) => {
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/results");
  };
  return (
    <div style={{ height: "500px" }}>
      <Widget
        id={formUrl}
        style={{ width: "100%", height: "100%" }}
        hideHeaders={true}
        hideFooter={true}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default TypeformEmbed;
