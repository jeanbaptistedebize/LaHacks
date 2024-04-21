import { GoogleGenerativeAI } from '@google/generative-ai';
import { API_KEY_GEM } from 'setup';

async function geminiClassify(base64image: string) {
  const genAI = new GoogleGenerativeAI(API_KEY_GEM);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

  const prompt = `You are given an image of a plant. Your response must be a JSON object containing 8 fields that are all strings. Rarity should be common, uncommon, or rare. One of the important fields is isleaf. If the picture is a closeup of a leaf, this field should be true. Otherwise it should be false. In addition, disease should always be "healthy". Here is what you need to return:
  commonname, scientificname, isleaf, family, genus, species, description, disease, rarity.
  The description should be three sentences. Do not return null for any fields. If you are not sure, make a good guess. Do not include backticks or the word json. The response should begin with { and end with }.`;
  const image = {
    inlineData: {
      data: base64image /* see JavaScript quickstart for details */,
      mimeType: 'image/png',
    },
  };

  let result = await model.generateContent([prompt, image]);
  // change result from text to json
  result = JSON.parse(result.response.text());

  console.log('is a leaf?: ', result['isleaf']);
  if (result['isleaf'] == true) {
    console.log('the image is a leaf, querying additional information...');
    const species = await predictLeafSpecies(base64image);
    const disease = await isDisease(base64image);
    const supplement = await geminiSupplement(species, disease);
    return supplement;
  } else {
    console.log('the image is not a leaf, returning...\n');
    return result;
  }
}

async function geminiSupplement(species, disease) {
  // get API_KEY from environment
  const API_KEY = process.env.API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  //const prompt = "You will return a json response of the common name and scientific name of the flower in the image.";

  const prompt = `You are given a species: ${species}, and a disease: ${disease}. Your response must be a JSON object containing 8 fields that are all strings. isleaf should be set to true or false. Rarity should be common, uncommon, or rare. Here is what you need to return:
  commonname, scientificname, isleaf, family, genus, species, description, disease, rarity.
  The description should be three sentences. Do not return null for any fields. If you are not sure, make a good guess. Do not include backticks or the word json. The response should begin with { and end with }.`;

  let result = await model.generateContent(prompt);
  result = JSON.parse(result.response.text());
  // const response = await result.response.text();

  return result;
}

async function predictLeafSpecies(imageBase64) {
  const url = 'http://127.0.0.1:5000/predict'; // URL of the Flask server
  const data = {
    image: imageBase64,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result.species;
  } catch (error) {
    console.error('Error predicting species:', error);
  }
}

async function isDisease(imageBase64) {
  const url = 'http://127.0.0.1:5000/disease'; // URL of the Flask server
  const data = {
    image: imageBase64,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let result = await response.json();
    // go through the dictionary, find the key with the highest value
    // if it is greater than .5, return the key, else return 'healthy'

    let max = 0;
    let maxKey = '';
    for (const key in result) {
      if (result[key] > max) {
        max = result[key];
        maxKey = key;
      }
    }

    if (max > 0.5) {
      result = maxKey;
      return maxKey;
    } else {
      return 'healthy';
    }
  } catch (error) {
    console.error('Error predicting species:', error);
  }
}

export async function generateImage(base64image: string): Promise<any> {
  return await geminiClassify(base64image);
}
