import { Text, View, ImageBackground } from 'react-native';
import TopBar from "../../components/Topbar";
import { ScrollView, Box } from 'native-base';
import BottomDrawerMenu from "../../components/plantDescription";
import FLORAMAP from "../../../assets/floramap.png";
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

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
  {id: 11, type: "flower", name: "homhunculus munculus", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhYfRwxLakUvGTspE2UDPI8pUviM3wi-2xV4EcL-ePrg&s'},
]

interface Props {
  onPress?: () => void;
  children: JSX.Element;
}

function CustomIconButton({ onPress, children }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box width="min-content" height="min-content" backgroundColor="transparent">
        {children}
      </Box>
    </TouchableOpacity>
  );
}

export default function Collection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function coolfunc() {
    var list = []
    for (let i = 0; i < 12; i++) {
      list[i] = <View style={{
        height: 120,
        width: 120,
        backgroundColor: '#23774400',
        borderRadius: 15,
        margin: 8,
      }}>
        
      </View>
    }
    return list;
  }

  function stateChecker() {
    if (isMenuOpen) {
      return <BottomDrawerMenu
      isOpen={isMenuOpen}
      onClose={toggleMenu}
      delay={300}
      plant={{
        name: "Flower Name",
        image: "",
        rarity: "common",
        description:
          "Their stems are usually prickly and their glossy, green leaves have toothed edges. Rose flowers vary in size and shape. They burst with colors ranging from pastel pink, peach, and cream,",
      }}
    />
    } else {
      return (<BottomDrawerMenu
          isOpen={isMenuOpen}
          onClose={toggleMenu}
          delay={300}
          plant={{
            name: "Flower Name",
            image: "",
            rarity: "common",
            description:
              "Their stems are usually prickly and their glossy, green leaves have toothed edges. Rose flowers vary in size and shape. They burst with colors ranging from pastel pink, peach, and cream,",
          }}
      />)
    }
  }

  return (
    <View>
      <View style={{position: 'absolute', top: 0, width: 200, height: 100, zIndex: 5, padding: 20}}>
        <ImageBackground resizeMode='contain' source={FLORAMAP} style={{width: '100%', height: '100%'}}></ImageBackground>
      </View>
      <View style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: '#EBFFD7',
      }}>
        <Text style={{
          height: 'auto',
          margin: 10,
          marginRight: 30,
          marginTop: 50,
          backgroundColor: '#EBFFD7',
          fontSize: 18,
          fontWeight: 700,
          textAlign: 'right'
        }}>
          Garden
        </Text>
        <View style={{}}>
        <ScrollView style={{position: 'absolute', height: 900}}>
          <View style={{
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: '#EAFFEA',
            flex: 1,
            marginTop: 0,
            padding: 30,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}>
            <View style={{
              width: 314,
              height: 36,
              marginTop: -10,
              marginBottom: 5,
              display: 'flex',
              flexDirection: 'row'
            }}>
              <View style={{display: 'flex', flex: 1, flexDirection: 'row', backgroundColor: '#FFFFFF00', alignItems: 'center'}}>
              <ImageBackground source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/735px-Magnifying_glass_icon.svg.png?20130526065603'}}
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
                <Text style={{marginLeft: 12, padding: 10, paddingLeft: 0}}>
                  Search
                </Text>
              </View>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', borderColor: 'black', borderWidth: 1, borderStyle: 'solid',  width: 'min-content', height: '100%', backgroundColor: '#FFFFFF60'}}>
                  <ImageBackground source={{uri: 'https://cdn-icons-png.flaticon.com/256/9851/9851190.png'}}
                      style={{
                        height: 18,
                        width: 18,
                        margin: 5
                      }}
                    />
                  <Text style={{marginRight: 5}}>SORT BY</Text>
              </View>
            </View>
            {
              templatePlantList.map((item)=><CustomIconButton onPress={()=>{setIsMenuOpen(true)}}>
                <View style={{
                  height: 120,
                  width: 117,
                  backgroundColor: '#237744',
                  borderRadius: 15,
                  margin: 20,
                  shadowColor: 'black',
                  shadowOpacity: 0.7,
                  shadowRadius: 4,
                  shadowOffset: {width: 3, height: 5}
                }}>
                  <ImageBackground borderRadius="25px" resizeMode='fit' style={{height: '100%', width: '100%'}} source={{
                    uri: item.image,
                  }} />
                  <View style={{
                    position: 'absolute',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    width: '100%',
                    height: 5,
                    bottom: 0,
                    transform: 'translateY(25px)',
                    borderRadius: 20}}/>
                  
                </View>
              </CustomIconButton>)
            }
            {coolfunc()}
          </View>
        </ScrollView>
        </View>
        {stateChecker()}
      </View>
      <TopBar/>
    </View>
  );
}