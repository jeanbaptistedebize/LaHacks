import {
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import TopBar from "../../components/Topbar";
import { ScrollView } from "native-base";
import BottomDrawerMenu from "../../components/plantDescription";
import { useState } from "react";
import { useGetOwnedPlantQuery } from "../../services/user/user";
import { PlantAll } from "../../services/user/user.dto";

const RARITY_MAP = {
  common: "#FF8A8A",
  uncommom: "#FFD45F",
  rare: "#788BFF",
} as const;

export default function Collection() {
  const { data } = useGetOwnedPlantQuery();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [flowerSelected, setFlower] = useState<PlantAll | null>(null);

  const toggleMenu = () => {
    if (!isMenuOpen) setFlower(null);
    setIsMenuOpen(!isMenuOpen);
  };

  const selectFlower = (flower: PlantAll) => {
    console.log(flower.commonname);
    toggleMenu();
    setFlower(flower);
  };

  function coolfunc() {
    var list = [];
    for (let i = 0; i < 12; i++) {
      list[i] = (
        <View
          style={{
            height: 120,
            width: 120,
            backgroundColor: "#23774400",
            borderRadius: 15,
            margin: 8,
          }}
        ></View>
      );
    }
    return list;
  }

  return (
    <View>
      <View
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#EBFFD7",
        }}
      >
        <Text
          style={{
            height: "auto",
            margin: 30,
            marginTop: 50,
            backgroundColor: "#EBFFD7",
            fontSize: 24,
            fontWeight: "700",
          }}
        >
          Discovered Plants
        </Text>
        <View style={{}}>
          <ScrollView style={{ position: "absolute", height: 900 }}>
            <View
              style={{
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                backgroundColor: "#EAFFEA",
                flex: 1,
                marginLeft: 20,
                marginRight: 20,
                marginTop: 0,
                padding: 30,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {!data ? (
                <ActivityIndicator />
              ) : (
                data.plants.map((item) => (
                  <TouchableOpacity
                    style={{
                      height: 120,
                      width: 120,
                      backgroundColor: "#237744",
                      borderRadius: 15,
                      margin: 8,
                      borderColor: RARITY_MAP[item.rarity] ?? "#237744",
                      borderWidth: 4,
                    }}
                    onPress={() => selectFlower(item)}
                  >
                    <Image
                      resizeMode="cover"
                      source={{ uri: `data:image/png;base64,${item.image}` }}
                      style={{
                        borderRadius: 15,
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </TouchableOpacity>
                ))
              )}
              {coolfunc()}
            </View>
          </ScrollView>
        </View>
        {isMenuOpen && flowerSelected ? (
          <BottomDrawerMenu
            isOpen={isMenuOpen}
            onClose={toggleMenu}
            delay={300}
            plant={flowerSelected}
          />
        ) : (
          <BottomDrawerMenu
            isOpen={isMenuOpen}
            onClose={toggleMenu}
            delay={300}
          />
        )}
      </View>
      <TopBar />
    </View>
  );
}
