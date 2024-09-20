import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { clientName, formBody } = await req.json();

    const personalizedFormBody = JSON.stringify(formBody).replaceAll(
      "Generic-Company",
      clientName
    );

    const response = await fetch("https://api.typeform.com/forms", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.TYPEFORM_API_KEY}`,
      },
      body: personalizedFormBody,
    });

    if (!response.ok) {
      throw new Error(
        `Typeform API (create-form) request failed with status ${response.status}`
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error creating form:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create form" },
      { status: 500 }
    );
  }
}
