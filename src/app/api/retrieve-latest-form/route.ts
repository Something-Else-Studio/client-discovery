import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://api.typeform.com/forms", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.TYPEFORM_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Typeform API (retrieve-latest-form) request failed with status ${response.status}`
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
