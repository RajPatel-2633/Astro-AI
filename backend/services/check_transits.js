import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Transit from '../models/Transit.models.js';

dotenv.config();

async function checkTransits() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");
        
        const now = new Date();
        const todayStart = new Date(now);
        todayStart.setHours(0, 0, 0, 0);
        
        const allTransits = await Transit.find({});
        console.log(`Total Transits in DB: ${allTransits.length}`);
        
        const upcoming = await Transit.find({ starts_at: { $gte: todayStart } });
        console.log(`Upcoming (starts_at >= today): ${upcoming.length}`);
        
        const active = await Transit.find({
            starts_at: { $lte: now },
            ends_at: { $gte: now }
        });
        console.log(`Active (currently happening): ${active.length}`);
        
        if (allTransits.length > 0) {
            console.log("First 3 transits:");
            allTransits.slice(0, 3).forEach(t => {
                console.log(`- ${t.title}: ${t.starts_at} to ${t.ends_at}`);
            });
        }
        
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

checkTransits();
