import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { form_id, answers } = await req.json();
  try {
    const response = await fetch(
      `https://api.typeform.com/forms/${form_id}/responses`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.TYPEFORM_API_KEY}`,
        },
        body: JSON.stringify({ form_id, answers }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Typeform API (post-form-response) request failed with status ${response.status}`
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error submitting response:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit response" },
      { status: 500 }
    );
  }
}
