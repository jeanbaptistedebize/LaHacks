import { GoogleGenerativeAI } from "./GoogleApi.js";

import fs from 'fs';

// base 64 encode image
function encodeImageToBase64(filePath) {
  const fileData = fs.readFileSync(filePath);
  const base64Image = fileData.toString('base64');
  return base64Image;
}


async function generateImage() {
    // get API_KEY from environment
    const API_KEY = process.env.API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const imagePath = 'sunflower.jpg';
    const base64image = encodeImageToBase64(imagePath);

    //const prompt = "You will return a json response of the common name and scientific name of the flower in the image.";

    const prompt = `
    You are given an image of a plant. Your response must be a JSON object containing 13 fields that are all strings. Here is what you need to return: 

    commonname, scientificname, kingdom, subkingdom, superdivision, division, class, sublcass, order, family, genus, species, description. 

    The description should be three sentences. Do not return null for any fields. If you are not sure, make a good guess. 

    `

    const image = {
      inlineData: {
        data: base64image /* see JavaScript quickstart for details */,
        mimeType: "image/png",
      },
    };


    const result = await model.generateContent([prompt, image]);
    console.log(result.response.text());
}
//generateImage();
//o

async function predictLeafSpecies(imageBase64) {
    const url = ' http://127.0.0.1:5000';  // URL of the Flask server
    const data = {
        image: imageBase64
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Predicted species:', result.species);
        return result.species;
    } catch (error) {
        console.error('Error predicting species:', error);
    }
}

const imagePath = 'sunflower.jpg';
const base64image = encodeImageToBase64(imagePath);
console.log(await predictLeafSpecies(base64image));
