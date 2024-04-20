import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import { API_KEY_GEM } from 'setup';

// base 64 encode image
function encodeImageToBase64(filePath) {
  const fileData = fs.readFileSync(filePath);
  const base64Image = fileData.toString('base64');
  return base64Image;
}

export async function generateImage(base64image: String): Promise<string> {
  const genAI = new GoogleGenerativeAI(API_KEY_GEM);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

  const prompt =
    'return only the scientific name of the species in the image, nothing else';
  const image = {
    inlineData: {
      data: base64image /* see JavaScript quickstart for details */,
      mimeType: 'image/png',
    },
  };
  //@ts-ignore
  const result = await model.generateContent([prompt, image]);
  return result.response.text();
}
