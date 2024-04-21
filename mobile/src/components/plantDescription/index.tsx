import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Text,
  Image,
} from "react-native";

import { ScrollView } from "native-base";
import { PlantAll } from "../../services/user/user.dto";

export const RARITY_MAP = {
  common: "#FF8A8A",
  uncommon: "#FFD45F",
  rare: "#788BFF",
} as const;

interface BottomDrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  plant?: PlantAll;
  delay: number;
}

const BottomDrawerMenu = ({
  isOpen,
  onClose,
  plant,
  delay,
}: BottomDrawerMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [470, 100], // Change 600 as per your requirement
  });

  React.useEffect(() => {
    if (isOpen) setIsMenuOpen(true);
  }, [isOpen]);

  React.useEffect(() => {
    if (plant) {
      Animated.timing(animation, {
        toValue: isMenuOpen ? 1 : 0,
        duration: delay, // Change duration as per your requirement
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished && !isMenuOpen) onClose();
      });
    }
  }, [isMenuOpen]);

  return (
    <Animated.View
      style={[
        {
          transform: [{ translateY }],
        },
      ]}
    >
      <ScrollView
        scrollEnabled={isMenuOpen}
        scrollEventThrottle={64}
        onScroll={({ nativeEvent }) => {
          if (nativeEvent.contentOffset.y < -50) {
            setIsMenuOpen(false);
          }
        }}
      >
        <View style={{ height: 70 }} />
        <View
          style={[
            styles.container,
            { borderColor: plant ? RARITY_MAP[plant.rarity] : "transparent" },
          ]}
        >
          {plant && (
            <Image
              resizeMode="cover"
              source={{ uri: `data:image/png;base64,${plant.image}` }}
              style={{
                width: 140,
                height: 140,
                alignSelf: "center",
                position: "absolute",
                top: "-10%",
                borderRadius: 90,
                borderColor: "#474343",
                borderWidth: 4,
              }}
            />
          )}
          {plant && (
            <View style={{ gap: 16, marginTop: 70 }}>
              <Text style={[styles.title]}>
                {plant.commonname} ({plant.scientificname})
              </Text>
              <Text style={styles.description}>{plant.description}</Text>
              <Text style={styles.rarity}>Rarity: {plant.rarity}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    backgroundColor: "red",
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    fontFamily: "Itim_400Regular",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Itim_400Regular",
  },
  rarity: {
    fontSize: 14,
    fontFamily: "Itim_400Regular",
  },
  container: {
    height: 700,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFDED",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 10,
    borderWidth: 6,
    width: "105%",
    alignSelf: "center",
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#050B02",
    opacity: 0.2,
    alignSelf: "center",
    borderRadius: 2,
  },
});

export default BottomDrawerMenu;
