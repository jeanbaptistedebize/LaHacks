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

    const prompt = "return only the scientific name of the species in the image, nothing else";
    const image = {
      inlineData: {
        data: base64image /* see JavaScript quickstart for details */,
        mimeType: "image/png",
      },
    };


    const result = await model.generateContent([prompt, image]);
    console.log(result.response.text());
}
generateImage();
