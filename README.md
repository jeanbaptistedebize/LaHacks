<p align="center">
  <img src="https://github.com/jeanbaptistedebize/LaHacks/blob/main/floramap.png?raw=true" width="500"/>
</p>

### Collect, Learn, Support the Environment!

## Inspiration
We interact with plants everyday -- breathe in their oxygen, eat their fruits, and enjoy their presence. 

But we rarely take the time to learn about their origins, attributes, and uses! With FloraQuest, you can collect plants virtually and learn at the same time.

Open the camera to scan a plant or one of its leaves, and AI agents will tell you its uses, regions, if it has a disease, and some fun facts.
The newly discovered plant will be added to your collection and logged on the public map for all to see and learn about. You can open this map to browse all discovered plants, and then you can go collect them!
If you are the first to catalog a new plant, you get extra points!

## Overview
By cataloging a robust map of plant locations, diseases, and densities, users are supporting environmental efforts.
In addition, FloraQuest helps you to be aware of and learn about your environment.

<p align="center">
  <img src="https://github.com/jeanbaptistedebize/LaHacks/blob/main/camera.png?raw=true" width="200">
  <img src="https://github.com/jeanbaptistedebize/LaHacks/blob/main/map.png?raw=true" width="200">
  <img src="https://github.com/jeanbaptistedebize/LaHacks/blob/main/garden.png?raw=true" width="200">
  <!--
  <img src="camera.png?raw=true" width="200">
  <img src="map.png?raw=true" width="200">
  <img src="garden.png?raw=true" width="200">
  -->
</p>

## Features + Tech

### AI Plant Classification

FloraQuest is built on top of 3 AI Models for classification. We use **Gemini** for initial classification, and we use **ResNet50** for leaf classification and a **Pretrained Model** for disease classification.
1. Gemini API - General Classifier
    - We use gemini to initially classify the plant based on image and location
    - if Gemini determines the image to be a close-up of a leaf, it will be sent to the leaf classifier
    - Gemini returns a description and the plant's order, family, genus, and species
    - the description includes the plant's regiion, bloom season (if applicable), cooking applications, and any notable facts
2. Finetuned ResNet50 - Leaf Classifier
    - We finetuned ResNet50 on the [LeafSnap Dataset](https://leafsnap.com/dataset/), about 30,000 images of the 185 most popular tree species in North America. (~3 Hours)
    - Intel Developer Cloud to fine-tune
    - Gemini fills in the description
3. Pretrained Model - Disease Classifier
    - If image is determined to be a leaf, it is sent to the disease classifier 
    - If disease confidence scores are high enough, the disease is noted to the user

### UI

- We used ReactNative and Expo for development
- We need access to camera, location, and map.

### Backend

- NodeJS holds all of our application logic
- Allows Gemini to communicate with other models

### Database

- PostgreSQL stores all discovered plants and users

### Full Stack: 

- Docker
    - PostgreSQL
    - NodeJS
- Flask
- PyTorch
- Gemini
- FetchAI
- HuggingFace pretrained model
- ResNet50
- ReactNative + Expo


## Next Steps
As the crowd sourced map grows, it will become a viable resource to track endangered species and plant density over time. Cities could track how green they are, and researchers could hunt down rare species. 
Eventually we want to implement features like special areas for national parks, city tracking, and leaderboards. All of this will incentivize documentation, awareness, and knowledge of our environment.

### Check out Our Github
[Github](https://github.com/jeanbaptistedebize/LaHacks)




