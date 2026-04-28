import asyncHandler from "../utils/AsyncHandler.utils.js";
import BirthChart from "../models/BirthChart.models.js";
import ApiResponse from "../utils/ApiResponse.utils.js";
import { NotFoundError } from "../utils/ApiError.utils.js";
import {calculateVedicChart} from "../services/astrology.service.js"
import BirthProfile from "../models/BirthProfile.models.js";


const generateChart = asyncHandler(async(req,res)=>{
    const {profile_id} = req.body;

    // Idempotency Check

    const existingChart = await BirthChart.findOne({profile_id});
    if(existingChart){
        return res.status(200).json(new ApiResponse(200,existingChart,"Chart already exists"));
    }

    const profile = await BirthProfile.findById(profile_id);
    if(!profile){
        throw new NotFoundError("Profile Not Found");
    }
    
    const formattedDob = profile.dob.toISOString().split('T')[0];
    
    const chartResults = calculateVedicChart(
        formattedDob, 
        profile.tob, 
        profile.latitude, 
        profile.longitude
    );

    

    const newChart = await BirthChart.create({
        profile_id,
        sun_sign: chartResults.sun_sign,
        moon_sign: chartResults.moon_sign,
        ascendant: chartResults.ascendant,
        nakshatra: chartResults.nakshatra,
        nakshatra_pada: chartResults.nakshatra_pada,
        planets: chartResults.planets, // This now includes Rahu and Ketu
        raw_data: chartResults.raw_data 
    });

    return res.status(201).json(new ApiResponse(201,newChart,"Chart generated successfully"));
});

const generateChartByProfileId = asyncHandler(async(req,res)=>{
    const {profile_id} = req.params;
    const chart = await BirthChart.findOne({profile_id}).populate("profile_id");
    if(!chart){
        throw new NotFoundError("Chart not generated for this profile yet.");
    }
    return res.status(200).json(new ApiResponse(200,chart,"Birth Chart Retrieved Successfully"));
});

export {generateChart,generateChartByProfileId};