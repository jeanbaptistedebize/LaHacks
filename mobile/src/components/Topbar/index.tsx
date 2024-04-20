// @ts-ignore
import EARTH from "../../../assets/icons/earth.png";
// @ts-ignore
import PROFILE from "../../../assets/icons/profile.png";
// @ts-ignore
import TRESOR from "../../../assets/icons/tresor.png";
import { Box, HStack, View } from "native-base";
import { Image } from "react-native";
import { useNavigate } from "react-router-native";
import CustomIconButton from "../CustomIconButton/CustomIconButton";

function TopBar() {
  const navigate = useNavigate();

  const navigateToPath = (path: string) => () => navigate(path);

  return (
    <HStack
      w="full"
      h={60}
      borderColor="#BDBDBD"
      borderWidth={1}
      px={2.5}
      marginTop={2}
      borderBottomRightRadius={16}
      borderBottomLeftRadius={16}
      borderTopWidth={0}
      alignItems="center"
      justifyContent="space-between"
    >
      <CustomIconButton onPress={navigateToPath("/")}>
        <Box height="30px" width="30px">
          <Image style={{ height: "100%", width: "100%" }} source={EARTH} />
        </Box>
      </CustomIconButton>
      <HStack justifyContent="space-between" alignItems="center">
        <CustomIconButton onPress={navigateToPath("/camera")}>
          <Box height="35px" width="35px">
            <Image style={{ height: "100%", width: "100%" }} source={TRESOR} />
          </Box>
        </CustomIconButton>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#BDBDBD",
            marginLeft: 5,
            marginRight: 3,
            height: 30,
          }}
        />
        <CustomIconButton onPress={navigateToPath("/")}>
          <Box height="35px" width="35px">
            <Image style={{ height: "100%", width: "100%" }} source={PROFILE} />
          </Box>
        </CustomIconButton>
      </HStack>
    </HStack>
  );
}

export default TopBar;
