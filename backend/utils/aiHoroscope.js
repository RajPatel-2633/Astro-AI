import { getGeminiResponse } from "../services/ai.service.js";
import Horoscope from "../models/Horoscope.models.js";
import { extractJson } from "./json.utils.js";

/**
 * Generates professional Vedic horoscopes for ALL 12 signs in a single AI call.
 */
export const generateAllSignsAIHoroscope = async (dateStr) => {
    const signs = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"];
    
    const prompt = `
        Generate a professional Vedic horoscope for ALL 12 zodiac signs for the date ${dateStr}.
        Return ONLY a JSON object with this structure:
        {
            "horoscopes": [
                {
                    "sign": "aries",
                    "prediction": { "general": "...", "love": "...", "career": "...", "health": "..." },
                    "scores": { "luck": 85, "love": 70, "career": 90, "health": 60 },
                    "lucky_color": "Blue",
                    "lucky_number": 7
                },
                ... (repeat for all 12 signs)
            ]
        }
    `;

    try {
        const aiResponse = await getGeminiResponse(prompt, [], "You are a professional Vedic Jyotish Expert. Return only valid JSON.");
        if (!aiResponse) return null;

        const data = extractJson(aiResponse);
        if (!data || !data.horoscopes) throw new Error("Invalid horoscope data format from AI");

        const results = [];
        for (const h of data.horoscopes) {
            const updated = await Horoscope.findOneAndUpdate(
                { sign: h.sign.toLowerCase(), date: dateStr },
                {
                    prediction: h.prediction,
                    scores: h.scores,
                    lucky_color: h.lucky_color,
                    lucky_number: h.lucky_number
                },
                { upsert: true, new: true }
            );
            results.push(updated);
        }

        console.log(`✅ All 12 AI Horoscopes generated for ${dateStr}`);
        return results;
    } catch (error) {
        console.error(`❌ AI Generation for all signs failed:`, error.message);
        return null;
    }
};
