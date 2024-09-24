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
    <div className="flex justify-center items-center h-[500px] w-full max-w-4xl mx-auto md:h-[400px] sm:h-[300px]">
      <Widget
        id={formUrl}
        className="w-full h-full rounded-lg shadow-lg overflow-hidden"
        hideHeaders={true}
        hideFooter={true}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default TypeformEmbed;
