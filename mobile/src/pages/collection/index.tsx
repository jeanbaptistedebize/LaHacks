import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import TopBar from "../../components/Topbar";
import { ScrollView, Box } from "native-base";
import BottomDrawerMenu, {
  RARITY_MAP,
} from "../../components/plantDescription";
// @ts-ignore
import FLORAMAP from "../../../assets/floramap.png";
import { useEffect, useState } from "react";
import { PlantAll } from "../../services/user/user.dto";
import { useGetOwnedPlantQuery } from "../../services/user/user";

interface Props {
  onPress?: () => void;
  children: JSX.Element;
}

function CustomIconButton({ onPress, children }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        width="min-content"
        height="min-content"
        backgroundColor="transparent"
      >
        {children}
      </Box>
    </TouchableOpacity>
  );
}

export default function Collection() {
  const { data } = useGetOwnedPlantQuery();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [flowerSelected, setFlower] = useState<PlantAll | null>(null);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data?.plants);

  useEffect(() => {
    if (data) {
      setFilteredData(data.plants);
      setQuery("");
    }
  }, [data]);

  const handleSearch = (text) => {
    if (data) {
      const filtered = data.plants.filter((item) =>
        item.commonname.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
    setQuery(text);
  };

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
          position: "absolute",
          top: 0,
          width: 200,
          height: 100,
          zIndex: 5,
          padding: 20,
        }}
      >
        <ImageBackground
          resizeMode="contain"
          source={FLORAMAP}
          style={{ width: "100%", height: "100%" }}
        ></ImageBackground>
      </View>
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
            margin: 10,
            marginRight: 30,
            marginTop: 50,
            backgroundColor: "#EBFFD7",
            fontSize: 18,
            fontWeight: "700",
            textAlign: "right",
          }}
        ></Text>
        <View style={{}}>
          <ScrollView style={{ position: "absolute", height: 900 }}>
            <View
              style={{
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
                backgroundColor: "#EBFFD7",
                flex: 1,
                marginTop: 0,
                padding: 30,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <View
                style={{
                  width: 314,
                  height: 36,
                  marginTop: -10,
                  marginBottom: 5,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "row",
                    backgroundColor: "#FFFFFF00",
                    alignItems: "center",
                  }}
                >
                  <ImageBackground
                    source={{
                      uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/735px-Magnifying_glass_icon.svg.png?20130526065603",
                    }}
                    style={{
                      height: 20,
                      width: 20,
                      marginLeft: 10,
                      marginRight: 12,
                    }}
                  />

                  <TextInput
                    style={{
                      height: 40,
                      borderColor: "transparent",
                      borderBottomColor: "grey",
                      borderWidth: 1,
                      marginBottom: 10,
                      paddingHorizontal: 10,
                    }}
                    placeholder="Search..."
                    value={query}
                    onChangeText={handleSearch}
                  />
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    borderColor: "black",
                    borderWidth: 1,
                    borderStyle: "solid",
                    height: "100%",
                    backgroundColor: "#FFFFFF60",
                    marginRight: 5,
                  }}
                >
                  <ImageBackground
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/256/9851/9851190.png",
                    }}
                    style={{
                      height: 18,
                      width: 18,
                      margin: 5,
                    }}
                  />
                  <Text style={{ marginRight: 5 }}>SORT BY</Text>
                </View>
              </View>
              {!filteredData ? (
                <ActivityIndicator />
              ) : (
                filteredData.map((item) => (
                  <CustomIconButton
                    onPress={() => {
                      selectFlower(item);
                    }}
                  >
                    <View
                      style={{
                        height: 119,
                        width: 119,
                        backgroundColor: "#237744",
                        borderWidth: 4,
                        borderRadius: 15,
                        borderColor: RARITY_MAP[item.rarity] ?? "#237744",
                        margin: 18,
                        shadowColor: "black",
                        shadowOpacity: 0.7,
                        shadowRadius: 4,
                        shadowOffset: { width: 3, height: 5 },
                      }}
                    >
                      <ImageBackground
                        borderRadius={15}
                        style={{ height: "100%", width: "100%" }}
                        source={{
                          uri: `data:image/png;base64,${item.image}`,
                        }}
                      />
                    </View>
                  </CustomIconButton>
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
            delay={100}
          />
        )}
      </View>
      <TopBar />
    </View>
  );
}
