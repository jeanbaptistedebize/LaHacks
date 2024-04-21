import io
import base64
from flask import Flask, request, jsonify
import torch
from torchvision import models, transforms, datasets
from torch import nn
from PIL import Image

from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "*"}})  # Explicitly allowing all origins for the /predict route

# Load the model
model_path = '/Users/evancoons/Downloads/model2.pth'  # Specify the path to your saved model weights
model = models.resnet50()  # Initialize the ResNet50 model
num_classes = 184  # Set the number of your output classes
model.fc = nn.Linear(model.fc.in_features, num_classes)  # Adjust the fully connected layer
model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
model.eval()

# Define the image transformations
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

class_labels = ['abies concolor', 'abies nordmanniana', 'acer campestre', 'acer ginnala', 'acer griseum', 'acer negundo', 'acer palmatum', 'acer pensylvanicum', 'acer platanoides', 'acer pseudoplatanus', 'acer rubrum', 'acer saccharinum', 'acer saccharum', 'aesculus flava', 'aesculus glabra', 'aesculus hippocastamon', 'aesculus pavi', 'ailanthus altissima', 'albizia julibrissin', 'amelanchier arborea', 'amelanchier canadensis', 'amelanchier laevis', 'asimina triloba', 'betula alleghaniensis', 'betula jacqemontii', 'betula lenta', 'betula nigra', 'betula populifolia', 'broussonettia papyrifera', 'carpinus betulus', 'carpinus caroliniana', 'carya cordiformis', 'carya glabra', 'carya ovata', 'carya tomentosa', 'castanea dentata', 'catalpa bignonioides', 'catalpa speciosa', 'cedrus atlantica', 'cedrus deodara', 'cedrus libani', 'celtis occidentalis', 'celtis tenuifolia', 'cercidiphyllum japonicum', 'cercis canadensis', 'chamaecyparis pisifera', 'chamaecyparis thyoides', 'chionanthus retusus', 'chionanthus virginicus', 'cladrastis lutea', 'cornus florida', 'cornus kousa', 'cornus mas', 'corylus colurna', 'crataegus crus-galli', 'crataegus laevigata', 'crataegus phaenopyrum', 'crataegus pruinosa', 'crataegus viridis', 'cryptomeria japonica', 'diospyros virginiana', 'eucommia ulmoides', 'evodia daniellii', 'fagus grandifolia', 'ficus carica', 'fraxinus americana', 'fraxinus nigra', 'fraxinus pennsylvanica', 'ginkgo biloba', 'gleditsia triacanthos', 'gymnocladus dioicus', 'halesia tetraptera', 'ilex opaca', 'juglans cinerea', 'juglans nigra', 'juniperus virginiana', 'koelreuteria paniculata', 'larix decidua', 'liquidambar styraciflua', 'liriodendron tulipifera', 'maclura pomifera', 'magnolia acuminata', 'magnolia denudata', 'magnolia grandiflora', 'magnolia macrophylla', 'magnolia soulangiana', 'magnolia stellata', 'magnolia tripetala', 'magnolia virginiana', 'malus angustifolia', 'malus baccata', 'malus coronaria', 'malus floribunda', 'malus hupehensis', 'malus pumila', 'metasequoia glyptostroboides', 'morus alba', 'morus rubra', 'nyssa sylvatica', 'ostrya virginiana', 'oxydendrum arboreum', 'paulownia tomentosa', 'phellodendron amurense', 'picea abies', 'picea orientalis', 'picea pungens', 'pinus bungeana', 'pinus cembra', 'pinus densiflora', 'pinus echinata', 'pinus flexilis', 'pinus koraiensis', 'pinus nigra', 'pinus parviflora', 'pinus peucea', 'pinus pungens', 'pinus resinosa', 'pinus rigida', 'pinus strobus', 'pinus sylvestris', 'pinus taeda', 'pinus thunbergii', 'pinus virginiana', 'pinus wallichiana', 'platanus acerifolia', 'platanus occidentalis', 'populus deltoides', 'populus grandidentata', 'populus tremuloides', 'prunus pensylvanica', 'prunus sargentii', 'prunus serotina', 'prunus serrulata', 'prunus subhirtella', 'prunus virginiana', 'prunus yedoensis', 'pseudolarix amabilis', 'ptelea trifoliata', 'pyrus calleryana', 'quercus acutissima', 'quercus alba', 'quercus bicolor', 'quercus cerris', 'quercus coccinea', 'quercus falcata', 'quercus imbricaria', 'quercus macrocarpa', 'quercus marilandica', 'quercus michauxii', 'quercus montana', 'quercus muehlenbergii', 'quercus nigra', 'quercus palustris', 'quercus phellos', 'quercus robur', 'quercus rubra', 'quercus shumardii', 'quercus stellata', 'quercus velutina', 'quercus virginiana', 'robinia pseudo-acacia', 'salix babylonica', 'salix caroliniana', 'salix matsudana', 'salix nigra', 'sassafras albidum', 'staphylea trifolia', 'stewartia pseudocamellia', 'styrax japonica', 'styrax obassia', 'syringa reticulata', 'taxodium distichum', 'tilia americana', 'tilia cordata', 'tilia europaea', 'tilia tomentosa', 'toona sinensis', 'tsuga canadensis', 'ulmus americana', 'ulmus glabra', 'ulmus parvifolia', 'ulmus pumila', 'ulmus rubra', 'zelkova serrata']


def decode_image(img_str):
    """Decode the base64 image string into a PIL image."""
    img_bytes = base64.b64decode(img_str)
    img = Image.open(io.BytesIO(img_bytes)).convert('RGB')
    return img

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    try:
        # Decode the image
        img = decode_image(data['image'])
        # Transform the image
        img_tensor = transform(img)
        # Add batch dimension
        img_tensor = img_tensor.unsqueeze(0)
        
        # Prediction
        with torch.no_grad():
            outputs = model(img_tensor)
            _, predicted = torch.max(outputs.data, 1)
            predicted_species = predicted.item()
            predicted_species_name = class_labels[predicted_species]  # Map index to name

        
        print("predicted species: ", predicted_species_name)
        return jsonify({'species': predicted_species_name})
    except Exception as e:
        return jsonify({'error': str(e)})
    

API_URL = "https://api-inference.huggingface.co/models/stanghong/leaf-disease-id"
headers = {"Authorization": "Bearer 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"}

@app.route('/disease', methods=['POST'])
def disease(): 
    data = request.json
    try: 
        image_data = base64.b64encode(data)
        response = requests.post(API_URL, headers=headers, data=image_data)

        responsedict = {}
        for element in response.json(): 
            responsedict[element['label']] = element['score']

        print("disease: ", responsedict)
        return jsonify(responsedict)

    except Exception as e: 
        return jsonify({'error': str(e)})



if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Run the server on port 5000

