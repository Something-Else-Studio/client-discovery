import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const response = await fetch(
      `https://api.typeform.com/forms/${id}/responses`,
      {
        cache: "no-store",
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.TYPEFORM_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Typeform API (retrieve-latest-response) request failed with status ${response.status}`
      );
    }

    const data = await response.json();
    console.log(data.items[0]);
    return NextResponse.json({ success: true, data: data.items[0] });
  } catch (error) {
    console.error("Error retrieving latest response:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve response" },
      { status: 500 }
    );
  }
}
