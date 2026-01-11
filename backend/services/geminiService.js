const { genAI } = require('../config/gemini');

const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

const generateTripPlan = async (tripDetails) => {
  const { location, days, budget, travelers, interests } = tripDetails;

  const prompt = `
    Generate a detailed ${days}-day trip plan for ${travelers} people to ${location} with a ${budget} budget.
    Interests: ${interests}.
    
    Please provide the response in valid JSON format with the following structure:
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
          "image_keyword": "highly descriptive keyword for searching images of this specific hostel interior or exterior"
        }
      ],
      "famousRestaurants": [
        {
          "name": "Restaurant Name",
          "specialty": "Main dish or style",
          "location": "Address or area",
          "description": "Why it is famous",
          "image_keyword": "highly descriptive keyword for searching images of this restaurant or its signature dish"
        }
      ],
      "mustVisitPlaces": [
        {
          "name": "Place Name",
          "description": "Brief description of the landmark or place",
          "image_keyword": "highly descriptive keyword including the destination name for searching images of this place (e.g., 'Eiffel Tower Paris')"
        }
      ],
      "mustTryDishes": [
        {
          "name": "Dish Name",
          "description": "What it is",
          "image_keyword": "highly descriptive keyword for searching high-quality images of this specific local dish"
        }
      ],
      "dailyItinerary": [
        {
          "day": 1,
          "title": "Theme of the day",
          "activities": [
            {
              "time": "Time (e.g., 9:00 AM)",
              "activity": "Activity title",
              "description": "Brief description",
              "duration": "Duration",
              "estimatedCost": "Estimated cost"
            }
          ],
          "meals": "Suggestions for breakfast, lunch, and dinner",
          "accommodation": "Suggested style"
        }
      ],
      "packingList": ["Item 1", "Item 2"],
      "travelTips": ["Tip 1", "Tip 2"],
      "estimatedTotalCost": "Total estimated cost"
    }
    
    Do not include markdown formatting (like \`\`\`json) in the response, just the raw JSON string.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up if markdown block quotes are present
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error generating trip:", error);
    throw new Error(error.message || "Failed to generate trip plan");
  }
};

module.exports = { generateTripPlan };
