import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { painting } from "@/lib/db/schema";

export async function GET() {
  try {
    const paintings = await db.select().from(painting);

    return NextResponse.json(paintings);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch paintings" },
      { status: 500 }
    );
  }
}