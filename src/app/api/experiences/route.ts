import { NextResponse } from "next/server";
import { getExperiences } from "@/services/experiences";
 
export async function GET() {
  try {
    const experiences = await getExperiences();
    return NextResponse.json(experiences, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (error) {
    console.error("[experiences] D1 error:", error);
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
}
 