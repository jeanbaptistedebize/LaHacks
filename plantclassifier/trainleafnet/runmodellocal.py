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
model_path = 'model.pth'  # Specify the path to your saved model weights
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

# dataset_path = '/Users/evancoons/Downloads/leafsnap-dataset/dataset/images/field'
# dataset = datasets.ImageFolder(dataset_path, transform=transform)
# class_labels = dataset.classes
class_labels = ['abies_concolor', 'abies_nordmanniana', 'acer_campestre', 'acer_ginnala', 'acer_griseum', 'acer_negundo', 'acer_palmatum', 'acer_pensylvanicum', 'acer_platanoides', 'acer_pseudoplatanus', 'acer_rubrum', 'acer_saccharinum', 'acer_saccharum', 'aesculus_flava', 'aesculus_glabra', 'aesculus_hippocastamon', 'aesculus_pavi', 'ailanthus_altissima', 'albizia_julibrissin', 'amelanchier_arborea', 'amelanchier_canadensis', 'amelanchier_laevis', 'asimina_triloba', 'betula_alleghaniensis', 'betula_jacqemontii', 'betula_lenta', 'betula_nigra', 'betula_populifolia', 'broussonettia_papyrifera', 'carpinus_betulus', 'carpinus_caroliniana', 'carya_cordiformis', 'carya_glabra', 'carya_ovata', 'carya_tomentosa', 'castanea_dentata', 'catalpa_bignonioides', 'catalpa_speciosa', 'cedrus_atlantica', 'cedrus_deodara', 'cedrus_libani', 'celtis_occidentalis', 'celtis_tenuifolia', 'cercidiphyllum_japonicum', 'cercis_canadensis', 'chamaecyparis_pisifera', 'chamaecyparis_thyoides', 'chionanthus_retusus', 'chionanthus_virginicus', 'cladrastis_lutea', 'cornus_florida', 'cornus_kousa', 'cornus_mas', 'corylus_colurna', 'crataegus_crus-galli', 'crataegus_laevigata', 'crataegus_phaenopyrum', 'crataegus_pruinosa', 'crataegus_viridis', 'cryptomeria_japonica', 'diospyros_virginiana', 'eucommia_ulmoides', 'evodia_daniellii', 'fagus_grandifolia', 'ficus_carica', 'fraxinus_americana', 'fraxinus_nigra', 'fraxinus_pennsylvanica', 'ginkgo_biloba', 'gleditsia_triacanthos', 'gymnocladus_dioicus', 'halesia_tetraptera', 'ilex_opaca', 'juglans_cinerea', 'juglans_nigra', 'juniperus_virginiana', 'koelreuteria_paniculata', 'larix_decidua', 'liquidambar_styraciflua', 'liriodendron_tulipifera', 'maclura_pomifera', 'magnolia_acuminata', 'magnolia_denudata', 'magnolia_grandiflora', 'magnolia_macrophylla', 'magnolia_soulangiana', 'magnolia_stellata', 'magnolia_tripetala', 'magnolia_virginiana', 'malus_angustifolia', 'malus_baccata', 'malus_coronaria', 'malus_floribunda', 'malus_hupehensis', 'malus_pumila', 'metasequoia_glyptostroboides', 'morus_alba', 'morus_rubra', 'nyssa_sylvatica', 'ostrya_virginiana', 'oxydendrum_arboreum', 'paulownia_tomentosa', 'phellodendron_amurense', 'picea_abies', 'picea_orientalis', 'picea_pungens', 'pinus_bungeana', 'pinus_cembra', 'pinus_densiflora', 'pinus_echinata', 'pinus_flexilis', 'pinus_koraiensis', 'pinus_nigra', 'pinus_parviflora', 'pinus_peucea', 'pinus_pungens', 'pinus_resinosa', 'pinus_rigida', 'pinus_strobus', 'pinus_sylvestris', 'pinus_taeda', 'pinus_thunbergii', 'pinus_virginiana', 'pinus_wallichiana', 'platanus_acerifolia', 'platanus_occidentalis', 'populus_deltoides', 'populus_grandidentata', 'populus_tremuloides', 'prunus_pensylvanica', 'prunus_sargentii', 'prunus_serotina', 'prunus_serrulata', 'prunus_subhirtella', 'prunus_virginiana', 'prunus_yedoensis', 'pseudolarix_amabilis', 'ptelea_trifoliata', 'pyrus_calleryana', 'quercus_acutissima', 'quercus_alba', 'quercus_bicolor', 'quercus_cerris', 'quercus_coccinea', 'quercus_falcata', 'quercus_imbricaria', 'quercus_macrocarpa', 'quercus_marilandica', 'quercus_michauxii', 'quercus_montana', 'quercus_muehlenbergii', 'quercus_nigra', 'quercus_palustris', 'quercus_phellos', 'quercus_robur', 'quercus_rubra', 'quercus_shumardii', 'quercus_stellata', 'quercus_velutina', 'quercus_virginiana', 'robinia_pseudo-acacia', 'salix_babylonica', 'salix_caroliniana', 'salix_matsudana', 'salix_nigra', 'sassafras_albidum', 'staphylea_trifolia', 'stewartia_pseudocamellia', 'styrax_japonica', 'styrax_obassia', 'syringa_reticulata', 'taxodium_distichum', 'tilia_americana', 'tilia_cordata', 'tilia_europaea', 'tilia_tomentosa', 'toona_sinensis', 'tsuga_canadensis', 'ulmus_americana', 'ulmus_glabra', 'ulmus_parvifolia', 'ulmus_pumila', 'ulmus_rubra', 'zelkova_serrata']


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

        
        return jsonify({'species': predicted_species_name})
    except Exception as e:
        return jsonify({'error': str(e)})
    

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Run the server on port 5000

