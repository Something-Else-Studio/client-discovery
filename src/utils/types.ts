export type TypeformFieldType =
  | "calendly"
  | "contact_info"
  | "date"
  | "dropdown"
  | "email"
  | "file_upload"
  | "group"
  | "legal"
  | "long_text"
  | "matrix"
  | "multiple_choice"
  | "nps"
  | "number"
  | "opinion_scale"
  | "payment"
  | "phone_number"
  | "picture_choice"
  | "ranking"
  | "rating"
  | "short_text"
  | "statement"
  | "website"
  | "yes_no";

export type OpinionScaleField = {
  id: string;
  properties: {
    description: string;
    start_at_one: boolean;
    steps: number;
  };
  ref: string;
  title: string;
  type: TypeformFieldType;
  validations: {
    required: boolean;
  };
};

export type LongTextField = {
  id: string;
  properties: {
    description: string;
  };
  ref: string;
  title: string;
  type: TypeformFieldType;
  validations: {
    required: boolean;
  };
};

export type FieldResponse = {
  field: { id: string };
  type: string;
  choice?: {
    label: string;
  };
  text?: string;
  ranking?: { labels: string[] };
};
