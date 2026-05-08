import cron from "node-cron";
import { runTransitAI } from "./transitFetcher.utils.js";
import Transit from "../models/Transit.models.js";

export const initialiseTransitAutomation = async()=>{
    try{
        const currentMonth = new Date().getMonth();
        const year = new Date().getFullYear();

        const count = await Transit.countDocuments({
            starts_at: { 
                $gte: new Date(year, currentMonth, 1),
                $lt: new Date(year, currentMonth + 1, 1)
            }
        });

        if(count === 0 ){

            await runTransitAI();
        } else {

        }

        cron.schedule("0 0 1 * *", async () => {

            await runTransitAI();

        },{
            scheduled:true,
            timezone:"Asia/Kolkata"
        });
    }catch(err){
        console.error("Transit Alert Failed", err.message);
    }
}