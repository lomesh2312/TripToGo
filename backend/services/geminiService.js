const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn('GEMINI_API_KEY is missing');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

const generateTripPlan = async (tripDetails) => {
  const { location, days, budget, travelers, interests } = tripDetails;

  const prompt = `
    Generate a detailed ${days}-day trip plan for ${travelers} people to ${location} with a ${budget} budget.
    Interests: ${interests}.
    
    Please provide the response in valid JSON format:
    {
      "trip_name": "Name of the trip",
      "destination": "${location}",
      "duration": ${days},
      "budget_level": "${budget}",
      "overview": "A brief overview of the trip",
      "bestTimeToVisit": "Best time to visit this location",
      "hostelOptions": [
        {
          "name": "Hostel Name",
          "price": "Price per night",
          "location": "Address or area",
          "description": "Brief description",
          "image_keyword": "keyword for searching images"
        }
      ],
      "famousRestaurants": [
        {
          "name": "Restaurant Name",
          "specialty": "Main dish or style",
          "location": "Address or area",
          "description": "Why it is famous",
          "image_keyword": "keyword for searching images"
        }
      ],
      "mustVisitPlaces": [
        {
          "name": "Place Name",
          "description": "Brief description of the landmark",
          "image_keyword": "keyword for images"
        }
      ],
      "mustTryDishes": [
        {
          "name": "Dish Name",
          "description": "What it is",
          "image_keyword": "keyword for images"
        }
      ],
      "dailyItinerary": [
        {
          "day": 1,
          "title": "Theme of the day",
          "activities": [
            {
              "time": "9:00 AM",
              "activity": "Activity title",
              "description": "Brief description",
              "duration": "Duration",
              "estimatedCost": "Cost"
            }
          ],
          "meals": "Food suggestions",
          "accommodation": "Stay suggestion"
        }
      ],
      "packingList": [],
      "travelTips": [],
      "estimatedTotalCost": "Total cost"
    }
    
    Do not include markdown formatting.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error(error.message || "Failed to generate plan");
  }
};

module.exports = { generateTripPlan };
