import { GoogleGenerativeAI } from "@google/generative-ai";

// Use VITE_ prefix
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

// Available models in v1beta
const AVAILABLE_MODELS = [
  'models/gemini-1.5-flash-002',
  'models/gemini-1.5-pro',
  'models/gemini-1.5-flash',
  'models/gemini-2.0-flash-001'
];

// Use gemini-1.5-flash as it's fast and cost-effective for this use case
const SELECTED_MODEL = 'models/gemini-1.5-flash';

export const analyzeResumeWithGemini = async (resumeText: string, jobDescription: string) => {
  try {
    // Check if API key is available
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      throw new Error("Gemini API key is not configured");
    }

    const model = genAI.getGenerativeModel({ model: SELECTED_MODEL });
    
    const prompt = `
      Analyze this resume against the job description and provide:
      1. An ATS compatibility score (0-100%)
      2. 3-5 tailored resume bullet points with before/after examples
      3. A short cover letter tailored to this job
      
      Resume: ${resumeText.substring(0, 3000)}
      
      Job Description: ${jobDescription.substring(0, 2000)}
      
      Format your response as a valid JSON object with this exact structure:
      {
        "atsScore": 85,
        "improvements": [
          {
            "original": "Original bullet point from resume",
            "improved": "Improved version tailored to job"
          }
        ],
        "coverLetter": "Generated cover letter text here"
      }
      
      Only respond with the JSON object, no other text.
    `;

    console.log("Using model:", SELECTED_MODEL);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("Gemini API response received");
    
    // Clean the response text
    const cleanedText = text.replace(/```json|```/g, '').trim();
    
    try {
      const parsedResult = JSON.parse(cleanedText);
      return parsedResult;
    } catch (parseError) {
      console.error("Failed to parse JSON response:", cleanedText);
      
      // If JSON parsing fails, try to extract JSON from the response
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch (secondParseError) {
          throw new Error("Failed to parse analysis response from Gemini");
        }
      }
      
      throw new Error("Failed to parse analysis response from Gemini");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    
    // Provide more specific error messages
    if (error.message.includes("API_KEY") || error.message.includes("key")) {
      throw new Error("Invalid Gemini API key. Please check your configuration.");
    } else if (error.message.includes("network") || error.message.includes("fetch")) {
      throw new Error("Network error. Please check your internet connection.");
    } else if (error.message.includes("quota")) {
      throw new Error("API quota exceeded. Please try again later.");
    } else if (error.message.includes("model")) {
      throw new Error("Model configuration error. Please contact support.");
    } else {
      throw new Error(`Analysis failed: ${error.message}`);
    }
  }
};

// Helper function to test available models
export const testAvailableModels = async () => {
  try {
    console.log("Testing available models...");
    
    for (const modelName of AVAILABLE_MODELS) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello");
        const response = await result.response;
        console.log(`Model ${modelName}: OK - ${response.text().substring(0, 50)}...`);
      } catch (error) {
        console.log(`Model ${modelName}: ERROR - ${error.message}`);
      }
    }
  } catch (error) {
    console.error("Error testing models:", error);
  }
};