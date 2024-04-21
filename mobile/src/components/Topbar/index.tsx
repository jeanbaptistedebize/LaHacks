// @ts-ignore
import EARTH from "../../../assets/globe.png";
// @ts-ignore
import PROFILE from "../../../assets/icons/profile.png";
// @ts-ignore

import NAVBAR from "../../../assets/nav.png";
// @ts-ignore

import CAMERA from "../../../assets/camera.png";
// @ts-ignore
import GARDEN from "../../../assets/garden.png";
// @ts-ignore
import TRESOR from "../../../assets/icons/tresor.png";
import { Box, HStack, View } from "native-base";
import { Image, Text, ImageBackground } from "react-native";
import { useNavigate } from "react-router-native";
import CustomIconButton from "../CustomIconButton/CustomIconButton";
import { useLoginMutation } from "../../services/auth/auth";

function TopBar() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const navigateToPath = (path: string) => () => navigate(path);

  return (
    <View style={{
      display: 'flex',
      width: '100%',
      height: 85,
      position: 'absolute',
      bottom: 50
    }}>
      <ImageBackground style={{marginLeft: 15, marginTop: -5, opacity: 0.4, paddingLeft: 15, paddingRight: 15, position: 'absolute', width: '100%', height: '110%' }} resizeMode="fit" source={NAVBAR}/>    
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 17,
        paddingLeft: 5,
        paddingRight: 25
      }}>
        <CustomIconButton onPress={navigateToPath("/")}>
          <Box marginLeft="10px" height="40px" width="40px">
            <Image style={{ position: 'absolute', height: "100%", width: "100%" }} source={EARTH}></Image>
            <Text style={{height: '100%', transform: 'translateY(40px)', fontWeight: 'bold', color: 'white', textAlign: 'center'}}>
              Map
            </Text>
          </Box>
        </CustomIconButton>
        <CustomIconButton onPress={navigateToPath("/camera")}>
          <Box backgroundColor="#8DDC8B" borderWidth='1px' borderColor="black" borderRadius="100" marginTop="-25px" marginLeft="42px" height="60px" width="60px">
            <ImageBackground resizeMode="contain" style={{ position: 'absolute', height: "100%", width: "100%" }} source={CAMERA}></ImageBackground>
            <Text style={{height: '100%', transform: 'translateY(65px)', fontWeight: 'bold', color: 'white', textAlign: 'center'}}>
              Scan
            </Text>
          </Box>
        </CustomIconButton>
        <CustomIconButton onPress={navigateToPath("/collection")}>
          <Box borderRadius="100" marginLeft="38px" height="40px" width="40px">
            <ImageBackground resizeMode="contain" style={{ position: 'absolute', height: "100%", width: "100%" }} source={GARDEN}></ImageBackground>
            <Text style={{height: '100%', marginLeft: -6, width: 51, transform: 'translateY(40px)', color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
              Garden
            </Text>
          </Box>
        </CustomIconButton>
      </View>
    </View>
  );
  // return (
  //   <HStack
  //     w="full"
  //     h={60}
  //     borderColor="#BDBDBD"
  //     backgroundColor={"#237744"}
  //     borderWidth={1}
  //     px={2.5}
  //     borderTopRightRadius={16}
  //     borderTopLeftRadius={16}
  //     borderTopWidth={0}
  //     alignItems="center"
  //     justifyContent="space-between"
  //     position={"absolute"}
  //     bottom={0}
  //     width="100%"
  //   >
  //     <CustomIconButton onPress={navigateToPath("/")}>
  //       <Box height="30px" width="30px">
  //         <Image style={{ height: "100%", width: "100%" }} source={EARTH} />
  //       </Box>
  //     </CustomIconButton>
  //     <HStack justifyContent="space-between" alignItems="center">
  //       <CustomIconButton onPress={navigateToPath("/camera")}>
  //         <Box height="35px" width="35px">
  //           <Image style={{ height: "100%", width: "100%" }} source={TRESOR} />
  //         </Box>
  //       </CustomIconButton>
  //       <View
  //         style={{
  //           borderWidth: 1,
  //           borderColor: "#BDBDBD",
  //           marginLeft: 5,
  //           marginRight: 3,
  //           height: 30,
  //         }}
  //       />
  //       <CustomIconButton onPress={navigateToPath("/collection")}>
  //         <Box height="35px" width="35px">
  //           <Image style={{ height: "100%", width: "100%" }} source={PROFILE} />
  //         </Box>
  //       </CustomIconButton>
  //     </HStack>
  //   </HStack>
  // );
}

export default TopBar;
