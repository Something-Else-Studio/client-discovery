import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(`https://api.typeform.com/forms`, {
      cache: "no-store",
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.TYPEFORM_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Typeform API (retrieve-form-by-id) request failed with status ${response.status}`
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data: data.items[0] });
  } catch (error) {
    console.error("Error retrieving latest form:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve latest form" },
      { status: 500 }
    );
  }
}
