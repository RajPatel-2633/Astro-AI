/**
 * Utility to reliably extract JSON from an AI response that might contain conversational text.
 */
export const extractJson = (text) => {
    try {
        // Try parsing the whole thing first
        return JSON.parse(text);
    } catch (e) {
        // Find the first '{' or '['
        const firstBrace = text.indexOf('{');
        const firstBracket = text.indexOf('[');
        
        let start = -1;
        let openChar, closeChar;
        
        if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
            start = firstBrace;
            openChar = '{';
            closeChar = '}';
        } else if (firstBracket !== -1) {
            start = firstBracket;
            openChar = '[';
            closeChar = ']';
        }
        
        if (start === -1) {
            throw new Error("No JSON object or array found in text");
        }

        // Brace balancing algorithm
        let balance = 0;
        let end = -1;
        let inString = false;
        let escaped = false;

        for (let i = start; i < text.length; i++) {
            const char = text[i];
            
            if (escaped) {
                escaped = false;
                continue;
            }
            
            if (char === '\\') {
                escaped = true;
                continue;
            }
            
            if (char === '"') {
                inString = !inString;
                continue;
            }
            
            if (!inString) {
                if (char === openChar) balance++;
                if (char === closeChar) {
                    balance--;
                    if (balance === 0) {
                        end = i;
                        break;
                    }
                }
            }
        }

        if (end === -1) {
            throw new Error(`Unbalanced ${openChar}${closeChar} in text`);
        }

        const jsonStr = text.substring(start, end + 1);
        try {
            return JSON.parse(jsonStr);
        } catch (innerError) {
            // Final attempt: clean trailing commas
            const cleaned = jsonStr.replace(/,\s*([}\]])/g, '$1');
            try {
                return JSON.parse(cleaned);
            } catch (finalError) {
                console.error("Failed JSON String:", jsonStr);
                throw new Error("Could not parse extracted JSON: " + finalError.message);
            }
        }
    }
};

