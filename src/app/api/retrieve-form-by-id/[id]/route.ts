import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const response = await fetch(`https://api.typeform.com/forms/${id}`, {
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
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(`Error retrieving form with id: ${id}`, error);
    return NextResponse.json(
      { success: false, error: `Failed to retrieve form ${id}` },
      { status: 500 }
    );
  }
}
