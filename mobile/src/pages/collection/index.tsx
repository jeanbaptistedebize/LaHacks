import { Text, View, ActivityIndicator, Image } from "react-native";
import TopBar from "../../components/Topbar";
import { ScrollView } from "native-base";
import BottomDrawerMenu from "../../components/plantDescription";
import { useState } from "react";
import { useGetOwnedPlantQuery } from "../../services/user/user";

const RARITY_MAP = {
  common: "#FF8A8A",
  uncommom: "#FFD45F",
  rare: "#788BFF",
} as const;

export default function Collection() {
  const { data } = useGetOwnedPlantQuery();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

  function stateChecker() {
    if (isMenuOpen) {
      return (
        <BottomDrawerMenu
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
      );
    } else {
      return (
        <BottomDrawerMenu
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
      );
    }
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
                  <View
                    style={{
                      height: 120,
                      width: 120,
                      backgroundColor: "#237744",
                      borderRadius: 15,
                      margin: 8,
                      borderColor: RARITY_MAP[item.rarity] ?? "#237744",
                      borderWidth: 4,
                    }}
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
                  </View>
                ))
              )}
              {coolfunc()}
            </View>
          </ScrollView>
        </View>
        {stateChecker()}
      </View>
      <TopBar />
    </View>
  );
}
