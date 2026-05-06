import { getGeminiResponse } from "../services/ai.service.js";
import Transit from "../models/Transit.models.js";
import { extractJson } from "./json.utils.js";

/**
 * Generates major upcoming planetary transits for the next 30 days using AI.
 */
export const generateAITransits = async () => {
    const today = new Date().toISOString().split('T')[0];
    const prompt = `
        Generate EXACTLY 15 significant upcoming planetary transits starting from today (${today}).
        Include major events like sign ingresses, retrogrades, and major conjunctions.
        Return ONLY a JSON object with this structure:
        {
            "transits": [
                {
                    "title": "...",
                    "planet": "...",
                    "event_type": "...",
                    "from_sign": "...",
                    "to_sign": "...",
                    "starts_at": "YYYY-MM-DD",
                    "ends_at": "YYYY-MM-DD",
                    "impact_level": "high/medium/low/positive",
                    "description": "...",
                    "affects_sign": ["aries", "leo", ...]
                }
            ]
        }
        Ensure there are exactly 15 items in the "transits" array, ordered by their start date.
    `;

    try {
        const aiResponse = await getGeminiResponse(prompt, [], "You are a professional Mundane Astrologer. Return only valid JSON.");
        if (!aiResponse) return null;

        const data = extractJson(aiResponse);

        // We'll clear old transits that haven't started yet or just add new ones.
        // For simplicity, let's just add them. 
        // Or better: clear all future transits and replace with fresh AI ones to keep it "dynamic".
        await Transit.deleteMany({ starts_at: { $gte: new Date() } });

        const transitsToInsert = data.transits.map(t => ({ ...t, is_ai: true }));
        const results = await Transit.insertMany(transitsToInsert);

        console.log(`✅ ${results.length} AI Transits generated/refreshed.`);
        return results;
    } catch (error) {
        console.error(`❌ AI Transit generation failed:`, error.message);
        return null;
    }
};
