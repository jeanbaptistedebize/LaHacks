import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
} from "react-native";

interface Plant {
  name: string;
  image: string;
  description: string;
  rarity: string;
}

interface BottomDrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  plant: Plant;
}

const BottomDrawerMenu = ({
  isOpen,
  onClose,
  plant,
}: BottomDrawerMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0], // Change 600 as per your requirement
  });

  React.useEffect(() => {
    if (isOpen) setIsMenuOpen(true);
  }, [isOpen]);

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: isMenuOpen ? 1 : 0,
      duration: 300, // Change duration as per your requirement
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && !isMenuOpen) onClose();
    });
  }, [isMenuOpen]);

  const closeit = () => {
    setIsMenuOpen(false);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      <TouchableOpacity
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: 20,
        }}
        onPress={closeit}
      >
        <View style={styles.handle} />
      </TouchableOpacity>
      <View style={{ gap: 16 }}>
        <Text style={styles.title}>{plant.name}:</Text>
        <Text style={styles.description}>{plant.description}</Text>
        <Text style={styles.rarity}>Rarity: {plant.rarity}</Text>
      </View>
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
    fontSize: 24,
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
    height: "50%",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#B8D8F6",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
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