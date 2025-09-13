// src/services/geminiService.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);

export const analyzeResumeWithGemini = async (resumeText: string, jobDescription: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
      Analyze this resume against the job description and provide:
      1. An ATS compatibility score (0-100%)
      2. 3-5 tailored resume bullet points with before/after examples
      3. A short cover letter tailored to this job
      
      Resume: ${resumeText.substring(0, 3000)} // Limit to avoid token limits
      
      Job Description: ${jobDescription.substring(0, 2000)} // Limit to avoid token limits
      
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

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean the response text
    const cleanedText = text.replace(/```json|```/g, '').trim();
    
    try {
      return JSON.parse(cleanedText);
    } catch {
      console.error("Failed to parse JSON:", cleanedText);
      throw new Error("Failed to parse analysis response");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};