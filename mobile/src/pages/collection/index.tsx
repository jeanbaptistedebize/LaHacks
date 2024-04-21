import { Text, View, Image } from 'react-native';
import TopBar from "../../components/Topbar";

const templatePlantList = [
  {id: 1, type: "flower", name: "homhunculus munculus"},
  {id: 2, type: "flower", name: "homhunculus munculus"},
  {id: 3, type: "flower", name: "homhunculus munculus"},
  {id: 4, type: "flower", name: "homhunculus munculus"},
  {id: 5, type: "flower", name: "homhunculus munculus"},
  {id: 6, type: "flower", name: "homhunculus munculus"}
]

export default function Collection() {
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
              <Image source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }} />
            </View>)
          }
        </View>
      </View>
      <TopBar/>
    </View>
  );
}