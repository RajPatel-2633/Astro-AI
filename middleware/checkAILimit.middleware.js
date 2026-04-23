export const checkAILimit = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const now = new Date();

    // Check if 24 hours have passed since last reset
    const hoursSinceReset = (now - user.ai_requests_reset_at) / (1000 * 60 * 60);
    
    if (hoursSinceReset >= 24) {
        // Reset the counter
        user.ai_requests_today = 0;
        user.ai_requests_reset_at = now;
        await user.save();
    }

    if (user.ai_requests_today >= 10) { // your daily limit
        return res.status(429).json({
            success: false,
            message: "Daily limit of 10 AI requests reached. Resets in 24 hours."
        });
    }

    // Increment and continue
    user.ai_requests_today += 1;
    await user.save();
    
    next();
}