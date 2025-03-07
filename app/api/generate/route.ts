import { NextRequest, NextResponse } from "next/server";
import { generateStudyMaterial } from "@/lib/gemini";
import { auth } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  
  try {
    console.log('\n📍 Starting API request...');
    
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log('✅ User authenticated:', userId);

    const body = await req.json();
    const { title, topic, type, difficulty } = body;
    console.log('📦 Request parameters:', { title, topic, type, difficulty });

    if (!title || !topic || !type || !difficulty) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    try {
      // Generate content
      console.log('🎯 Starting content generation...');
      const content = await generateStudyMaterial(topic, type, difficulty);
      console.log('✅ Content generated successfully');

      // Save to Supabase
      const { data, error } = await supabase
        .from('study_materials')
        .insert({
          user_id: userId,
          title,
          topic,
          type,
          difficulty,
          content,
          method: 'gemini'
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;
      console.log(`✨ Total request completed in ${duration.toFixed(2)} seconds\n`);

      return NextResponse.json({ success: true, data });
    } catch (error: any) {
      console.error("❌ Generation Error:", error);
      return NextResponse.json(
        { 
          error: error.message || "Failed to generate study material",
          details: error.toString()
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    console.error(`❌ Route Error after ${duration.toFixed(2)} seconds:`, error);
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}