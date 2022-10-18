import React, { useCallback, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../constants/Colors";
import { ConversionContext } from "../util/GlobalStateVariables";
import { PlaceRowItem } from "../components/PlaceRowItem";
import ModalPopUp, { ShowEditPlaceModal } from "../components/ModalPopUp";
import {
  db,
  saveDataToFirebaseDatabase,
  updateDataToDatabase,
  deleteDataToDatabase,
  fetchDatafromDatabase,
} from "../config/Firebase.jsx";

const screen = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    flexDirection: "column",
    overflow: "hidden",
  },

  appTitleWrapper: {
    width: 160,
    height: 36,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.appTitle,
    justifyContent: "center",
    paddingLeft: 6,
  },
  appTitleText: {
    fontFamily: "Roboto-Regular",
    fontSize: 15,
    color: Colors.orange,
  },
  placeListWrapper: {
    height: screen.height - 30 - 36 - 100 - 15, // 30 = kay paddingTop sa pinaka una na style , 36 = height sa List ofPlaces na label , 110 = height sa bottomMenuLayoutWrapper: ,15 = allowance para may space between ani ug ang menu sa ubos
    // flex: 1,
  },

  bottomScreenLayoutWrapper: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
  },
  bottomMenuLayoutWrapper: {
    width: screen.width,
    height: 100,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomMenuIconWrapper: {
    width: 132,
    height: 95,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.menuIcon,
    borderWidth: 1,
    borderRadius: 10,
  },
});

SplashScreen.preventAutoHideAsync();

export default ({ navigation, route }) => {
  const {
    places,
    setPlaces,
    setShouldShow,
    showAddModal,
    setShowAddModal,
    addPlaceText,
    setAddPlaceText,
    showEditPlaceModal,
    setShowEditPlaceModal,
    selectedPlace,
    setSelectedPlace,
    selectedPlaceID,
    setSelectedPlaceID,
  } = useContext(ConversionContext);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const parameterList = {
    navigation,
    places,
    setPlaces,
    setShouldShow,
    showAddModal,
    setShowAddModal,
    addPlaceText,
    setAddPlaceText,
    showEditPlaceModal,
    setShowEditPlaceModal,
    selectedPlace,
    setSelectedPlace,
    selectedPlaceID,
    setSelectedPlaceID,
  };

  console.log("selectedPlaceID Places.js_1: " + selectedPlaceID);
  return <View onLayout={onLayoutRootView}>{placesView(parameterList)}</View>;
};

// ****************************FUNCTIONS************************************************************
function _______________________________________________________________() {}

function placesView(parameterList) {
  const { navigation, places, setShowAddModal, selectedPlaceID } =
    parameterList;

  // console.log("places List in Places.js: ", places);
  return (
    <LinearGradient
      // Button Linear Gradient
      colors={["#615E5E", "#000000"]}
      //   colors={["#A5C8FF", "#23286B", "#192f6a"]}
      start={{ x: 0, y: -0.1 }}
      end={{ x: 1, y: 1 }}
      style={{ height: screen.height }}
    >
      <View style={styles.container}>
        <View>
          {/* App Title */}
          <SafeAreaView>
            <View style={styles.appTitleWrapper}>
              <Text style={styles.appTitleText}>List of Places</Text>
            </View>
          </SafeAreaView>

          {/* List of Places */}
          <View style={styles.placeListWrapper}>
            <FlatList
              data={places}
              renderItem={({ item }) => {
                return (
                  <>
                    <PlaceRowItem
                      placeData={item}
                      parameterList={parameterList}
                    />
                  </>
                );
              }}
              keyExtractor={(item) => item.id}
              // showsVerticalScrollIndicator={true}
              // showsHorizontalScrollIndicator={true}
              // horizontal={true}
            />
          </View>
        </View>

        {/* Modal Pop Up For Add Place */}
        <ModalPopUp parameterList={parameterList}></ModalPopUp>

        {console.log("selectedPlaceID Places.js_2: " + selectedPlaceID)}
        <ShowEditPlaceModal parameterList={parameterList}></ShowEditPlaceModal>

        {/* Menu */}
        <View style={styles.bottomScreenLayoutWrapper}>
          <View style={styles.bottomMenuLayoutWrapper}>
            {/* Add Button */}
            <TouchableOpacity
              onPress={() => {
                setShowAddModal(true);
              }}
            >
              <View style={styles.bottomMenuIconWrapper}>
                <Image source={require("../assets/images/AddIcon.png")} />
                <Text
                  style={{
                    paddingTop: 3,
                    color: Colors.orange,
                    fontFamily: "Roboto-Regular",
                  }}
                >
                  Add
                </Text>
              </View>
            </TouchableOpacity>
            {/* Back Button */}
            <TouchableOpacity
              onPress={() => backToHomeView(navigation, parameterList)}
            >
              <View style={styles.bottomMenuIconWrapper}>
                <Image source={require("../assets/images/BackIcon.png")} />
                <Text
                  style={{
                    paddingTop: 3,
                    color: Colors.orange,
                    fontFamily: "Roboto-Regular",
                  }}
                >
                  Back
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const backToHomeView = (navigation, parameterList) => {
  const { setShouldShow } = parameterList;
  setShouldShow(true);
  navigation.pop();
};
