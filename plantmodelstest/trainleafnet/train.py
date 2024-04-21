
import torch
import torchvision.transforms as transforms
from torchvision import datasets, models
from torch.utils.data import DataLoader
from torch import nn, optim

transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Update dataset path
dataset_path = '/Users/evancoons/Downloads/leafsnap-dataset/dataset/images/field'

# Load the dataset
dataset = datasets.ImageFolder(dataset_path, transform=transform)

# Splitting the dataset into training and testing sets
train_size = int(0.8 * len(dataset))
test_size = len(dataset) - train_size
train_dataset, test_dataset = torch.utils.data.random_split(dataset, [train_size, test_size])

# Create data loaders
train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=32, shuffle=False)

# Load a pretrained ResNet50 model
#model = models.resnet50(weights=True)
model = models.resnet50(weights=models.ResNet50_Weights.DEFAULT)

# Freeze all layers in the model
for param in model.parameters():
    param.requires_grad = False

# Replace the last fully connected layer with a new one with the appropriate number of output classes
num_classes = len(dataset.classes)  # Number of classes in the dataset
model.fc = nn.Linear(model.fc.in_features, num_classes)

# Move model to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)


criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.fc.parameters(), lr=0.001)  # Only train the last layer

#####################################
#####################################
#####################################
#####################################
model_path = '/Users/evancoons/projects/LaHacks/plantmodelstest/trainleafnet/model.pth'  # Specify the path to save your model
torch.save(model.state_dict(), model_path)
print(f'Model saved to {model_path}')
#####################################
#####################################
#####################################
# saving early to test

# Define number of epochs
num_epochs = 10

# Start training
model.train()
for module in model.modules():
    if isinstance(module, nn.BatchNorm2d):
        module.eval()
for epoch in range(num_epochs):
    for inputs, labels in train_loader:
        inputs, labels = inputs.to(device), labels.to(device)

        # Zero the parameter gradients
        optimizer.zero_grad()

        # Forward pass
        outputs = model(inputs)
        loss = criterion(outputs, labels)

        # Backward and optimize
        loss.backward()
        optimizer.step()

    print(f'Epoch {epoch+1}, Loss: {loss.item()}')

model.eval()
correct = 0
total = 0
with torch.no_grad():
    for inputs, labels in test_loader:
        inputs, labels = inputs.to(device), labels.to(device)
        outputs = model(inputs)
        _, predicted = torch.max(outputs.data, 1)
        total += labels.size(0)
        print("number of labels: ", len(labels))
        print("amount correct: ", (predicted == labels).sum().item())
        print("example: ", labels[0], predicted[0])
        correct += (predicted == labels).sum().item()

print(f'Accuracy: {100 * correct / total}%')

