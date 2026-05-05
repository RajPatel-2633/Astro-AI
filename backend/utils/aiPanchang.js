import { getGeminiResponse } from "../services/ai.service.js";
import Panchang from "../models/Panchang.models.js";
import { extractJson } from "./json.utils.js";

/**
 * Generates professional Vedic Panchang for a specific date using AI.
 */
export const generateAIPanchang = async (dateStr) => {
    const prompt = `
        Generate a professional Vedic Panchang (Daily Almanac) for the date ${dateStr}.
        Include: Tithi, Nakshatra, Yoga, Karana, Moon Phase, Moon Sign, and Timings (Sunrise, Sunset, Rahu Kaal, Auspicious).
        Return ONLY a JSON object with this structure:
        {
            "tithi": "...",
            "nakshatra": "...",
            "yoga": "...",
            "karana": "...",
            "moon_phase": "...",
            "moon_sign": "...",
            "timings": {
                "sunrise": "HH:MM AM/PM",
                "sunset": "HH:MM AM/PM",
                "rahu_kaal": { "start": "HH:MM AM/PM", "end": "HH:MM AM/PM" },
                "auspicious": { "start": "HH:MM AM/PM", "end": "HH:MM AM/PM" }
            }
        }
    `;

    try {
        const aiResponse = await getGeminiResponse(prompt, [], "You are a professional Vedic Astrologer and Panchang Expert. Return only valid JSON.");
        if (!aiResponse) return null;

        const data = extractJson(aiResponse);

        const updated = await Panchang.findOneAndUpdate(
            { date: dateStr },
            {
                ...data,
                date: dateStr
            },
            { upsert: true, new: true }
        );

        console.log(`✅ AI Panchang generated for ${dateStr}`);
        return updated;
    } catch (error) {
        console.error(`❌ AI Panchang generation failed:`, error.message);
        return null;
    }
};
