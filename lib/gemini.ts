import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

// Function to generate study material using Gemini
export async function generateStudyMaterial(
  topic: string,
  type: string,
  difficulty: string
): Promise<string> {
  const startTime = Date.now();
  
  try {
    console.log('\n🚀 Starting content generation...');
    console.log('📝 Parameters:', { topic, type, difficulty });
    
    // Get the generative model (Gemini)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    console.log('✅ Model initialized');

    // Create prompt
    const prompt = createPrompt(topic, type, difficulty);
    console.log('\n📋 Prompt used:', prompt, '\n');

    // Generate content
    console.log('🤖 Generating content with Gemini...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    console.log(`\n✨ Content generated in ${duration.toFixed(2)} seconds`);
    console.log('📄 Generated content:');
    console.log('----------------------------------------');
    console.log(text);
    console.log('----------------------------------------');
    console.log(`📊 Content length: ${text.length} characters\n`);
    
    return text;
  } catch (error) {
    console.error("Error generating study material:", error);
    throw new Error("Failed to generate study material. Please try again later.");
  }
}

// Helper function to create a prompt based on the study material type and difficulty
function createPrompt(topic: string, type: string, difficulty: string): string {
  let prompt = `Create a comprehensive study material about "${topic}" `;
  
  // Add type-specific instructions
  switch (type) {
    case "exam":
      prompt += `for exam preparation. Include key concepts, important formulas, sample questions with answers, and study tips. `;
      break;
    case "job-interview":
      prompt += `for job interview preparation. Include common interview questions, best answers, technical concepts, and practical examples. `;
      break;
    case "practice":
      prompt += `for practice and skill development. Include step-by-step tutorials, exercises with solutions, and practical applications. `;
      break;
    case "coding-prep":
      prompt += `for coding preparation. Include algorithm explanations, code examples, common patterns, and practice problems with solutions. `;
      break;
    default:
      prompt += `covering all essential aspects of the topic. Include key concepts, examples, and practical applications. `;
  }
  
  // Add difficulty-specific instructions
  switch (difficulty) {
    case "beginner":
      prompt += `The material should be suitable for beginners with no prior knowledge, using simple language and basic concepts. `;
      break;
    case "intermediate":
      prompt += `The material should be suitable for intermediate learners with some background knowledge, covering more complex concepts. `;
      break;
    case "advanced":
      prompt += `The material should be suitable for advanced learners, covering complex concepts in depth and including cutting-edge information. `;
      break;
  }
  
  // Add formatting instructions
  prompt += `Format the content with clear headings, subheadings, bullet points where appropriate, and organize it in a logical structure. Include a brief introduction and conclusion.`;
  
  return prompt;
}