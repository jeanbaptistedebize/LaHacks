import { Text, View, ImageBackground } from 'react-native';
import TopBar from "../../components/Topbar";
import { ScrollView } from 'native-base';
import BottomDrawerMenu from "../../components/plantDescription";
import { useState } from 'react';

const templatePlantList = [
  {id: 1, type: "flower", name: "homhunculus munculus", image: 'https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?cs=srgb&dl=pexels-jonaskakaroto-736230.jpg&fm=jpg'},
  {id: 2, type: "flower", name: "homhunculus munculus", image: 'https://assets-global.website-files.com/6586ad1766809383c71cd41e/65890a233344f1816429ec35_National-Flower-Day.jpeg'},
  {id: 3, type: "flower", name: "homhunculus munculus", image: 'https://assets-global.website-files.com/6586ad1766809383c71cd41e/65890a233344f1816429ec35_National-Flower-Day.jpeg'},
  {id: 4, type: "flower", name: "homhunculus munculus", image: 'https://assets-global.website-files.com/6586ad1766809383c71cd41e/65890a233344f1816429ec35_National-Flower-Day.jpeg'},
  {id: 5, type: "flower", name: "homhunculus munculus", image: 'https://assets-global.website-files.com/6586ad1766809383c71cd41e/65890a233344f1816429ec35_National-Flower-Day.jpeg'},
  {id: 6, type: "flower", name: "homhunculus munculus", image: 'https://assets-global.website-files.com/6586ad1766809383c71cd41e/65890a233344f1816429ec35_National-Flower-Day.jpeg'},
  {id: 7, type: "flower", name: "homhunculus munculus", image: 'https://assets-global.website-files.com/6586ad1766809383c71cd41e/65890a233344f1816429ec35_National-Flower-Day.jpeg'},
  {id: 8, type: "flower", name: "homhunculus munculus", image: 'https://assets-global.website-files.com/6586ad1766809383c71cd41e/65890a233344f1816429ec35_National-Flower-Day.jpeg'},
  {id: 9, type: "flower", name: "homhunculus munculus", image: 'https://assets-global.website-files.com/6586ad1766809383c71cd41e/65890a233344f1816429ec35_National-Flower-Day.jpeg'},
  {id: 10, type: "flower", name: "homhunculus munculus", image: 'https://assets-global.website-files.com/6586ad1766809383c71cd41e/65890a233344f1816429ec35_National-Flower-Day.jpeg'},
  {id: 11, type: "flower", name: "homhunculus munculus", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhYfRwxLakUvGTspE2UDPI8pUviM3wi-2xV4EcL-ePrg&s'}
]

export default function Collection() {
  const [isMenuUp, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuUp);
  };

  return (
    <View>
      <View style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: '#EBFFD7',
      }}>
        <Text style={{
          height: 'auto',
          margin: 30,
          marginTop: 50,
          backgroundColor: '#EBFFD7',
          fontSize: 24,
          fontWeight: 700
        }}>
          Discovered Plants
        </Text>
        <ScrollView>
        <View style={{
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          backgroundColor: '#EAFFEA',
          flex: 1,
          marginLeft: 20,
          marginRight: 20,
          marginTop: 0,
          padding: 30,
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}>
          {
            templatePlantList.map((item)=><View style={{
              height: 110,
              width: "46%",
              backgroundColor: '#237744',
              borderRadius: 15,
              margin: 5,
            }}>
              <ImageBackground borderRadius="25px" resizeMode='fit' style={{height: '100%', width: '100%'}} source={{
                uri: item.image,
              }} />
              
            </View>)
          }
        </View>
        </ScrollView>
      </View>
      <BottomDrawerMenu
        isOpen={true}
        onClose={toggleMenu}
        plant={{
          name: "Flower Name",
          image: "",
          rarity: "common",
          description:
            "Their stems are usually prickly and their glossy, green leaves have toothed edges. Rose flowers vary in size and shape. They burst with colors ranging from pastel pink, peach, and cream,",
        }}
      />
      <TopBar/>
    </View>
  );
}