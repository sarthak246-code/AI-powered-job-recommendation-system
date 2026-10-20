const { onRequest } = require("firebase-functions/v2/https");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
async function generateWithRetry(prompt) {
  let lastError;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
      });
    } catch (error) {
      lastError = error;

      const message = String(error?.message || "");

      const temporaryError =
        message.includes("503") ||
        message.includes("UNAVAILABLE") ||
        message.includes("429") ||
        message.includes("RESOURCE_EXHAUSTED");

      if (!temporaryError || attempt === 3) {
        throw error;
      }

      // Retry se pehle 2 seconds, phir 4 seconds wait
      await new Promise((resolve) =>
        setTimeout(resolve, attempt * 2000)
      );
    }
  }

  throw lastError;
}
exports.getJobRecommendations = onRequest(
  { maxInstances: 2, cors: true },
  async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Only POST requests are allowed",
      });
    }

    try {
      const { skills, jobRole, jobDescription } = req.body || {};

      if (
        !Array.isArray(skills) ||
        typeof jobDescription !== "string" ||
        skills.length === 0 ||
        !jobDescription.trim()
      ) {
        return res.status(400).json({
          error: "Please provide your skills and a job description.",
        });
      }

      const prompt = `
  You are a career assistant for a job portal.

  Candidate skills:
  ${skills.slice(0, 30).join(", ")}

  Job description:
  ${jobDescription.slice(0, 5000)}

    Explain:
    1. How well the candidate's skills match this job.
    2. Which required skills are missing.
    3. Three practical learning recommendations.

Give a clear, beginner-friendly answer.
`;

      const response = await generateWithRetry(prompt);

      return res.status(200).json({
        recommendation: response.text,
      });
    } catch (error) {
  console.error("Recommendation error:", error);

  const errorMessage = String(error?.message || "");

  if (
    errorMessage.includes("503") ||
    errorMessage.includes("UNAVAILABLE")
  ) {
    return res.status(503).json({
      error:
        "Gemini AI is temporarily busy. Please wait a little and try again.",
    });
  }

  return res.status(500).json({
    error: "AI recommendation generate nahi hui. Please check emulator logs.",
  });
}
  }
);