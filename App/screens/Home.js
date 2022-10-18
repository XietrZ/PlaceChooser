import React, { useCallback, useState, useContext } from "react";
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
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../constants/Colors";
import { ConversionContext } from "../util/GlobalStateVariables";
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
  selectorButtonLayoutWrapper: {
    justifyContent: "center",
    height: screen.height - 140 - 30,
  },
  buttonSelectorWrapper: {
    width: screen.width,
    alignItems: "center",
  },
  selectorTextWrapper: {
    fontFamily: "Roboto-Regular",
    fontSize: 26,
    color: Colors.orange,
    paddingTop: 30,
  },
  showLocationTextWrapper: {
    height: screen.height - 140 - 30,
    justifyContent: "center",
    alignItems: "center",
  },
  showLocationText: {
    fontFamily: "Roboto-Regular",
    fontSize: 64,
    textAlign: "center",
    color: Colors.orange,
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

export default ({ navigation }) => {
  const {
    shouldShow,
    setShouldShow,
    places,
    setPlaces,
    placeName,
    setPlaceName,
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
  const homeViewComponentData = [
    {
      id: 1,
    },
  ];

  const parameterList = {
    homeViewComponentData,
    shouldShow,
    setShouldShow,
    places,
    setPlaces,
    placeName,
    setPlaceName,
    navigation,
  };
  return <View onLayout={onLayoutRootView}>{homeView(parameterList)}</View>;
};

// ****************************FUNCTIONS************************************************************
function _______________________________________________________________() {}

function homeView(parameterList) {
  const { homeViewComponentData, navigation, shouldShow, placeName } =
    parameterList;
  return (
    <FlatList
      data={homeViewComponentData}
      renderItem={({ item }) => (
        //--> ADD DESIGN HERE
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
                  <Text style={styles.appTitleText}>Place Chooser</Text>
                </View>
              </SafeAreaView>
              {/* Selector Button Layout */}
              {showSelectorButtonLayout(parameterList)}
              {/* Show Location Text */}
              {!shouldShow ? (
                <View style={styles.showLocationTextWrapper}>
                  <Text style={styles.showLocationText}>{placeName}</Text>
                </View>
              ) : null}
            </View>

            {/* Menu */}
            <View style={styles.bottomScreenLayoutWrapper}>
              <View style={styles.bottomMenuLayoutWrapper}>
                {/* Reset Button */}
                <TouchableOpacity
                  onPress={() => onResetButtonPress(parameterList)}
                >
                  <View style={styles.bottomMenuIconWrapper}>
                    <Image
                      source={require("../assets/images/refreshIcon.png")}
                    />
                    <Text
                      style={{
                        paddingTop: 3,
                        color: Colors.orange,
                        fontFamily: "Roboto-Regular",
                      }}
                    >
                      Reset
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* List Button */}
                <TouchableOpacity onPress={() => navigation.push("Places")}>
                  <View style={styles.bottomMenuIconWrapper}>
                    <Image source={require("../assets/images/listIcon.png")} />
                    <Text
                      style={{
                        paddingTop: 3,
                        color: Colors.orange,
                        fontFamily: "Roboto-Regular",
                      }}
                    >
                      List
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
function showSelectorButtonLayout(parameterList) {
  const { shouldShow, setShouldShow } = parameterList;
  return shouldShow ? (
    <View style={styles.selectorButtonLayoutWrapper}>
      {/* Button Selector */}
      <View style={styles.buttonSelectorWrapper}>
        <TouchableOpacity onPress={() => onSelectorButtonPress(parameterList)}>
          <Image source={require("../assets/images/StartSelectButton.png")} />
        </TouchableOpacity>
      </View>

      {/* Button Selector Text */}
      <View style={{ alignItems: "center" }}>
        <Text style={styles.selectorTextWrapper}>
          Click button to Select Place
        </Text>
      </View>
    </View>
  ) : null;
}

const onSelectorButtonPress = (parameterList) => {
  const { setShouldShow } = parameterList;
  setShouldShow(false);
  selectPlaceNameRandomly(parameterList);
  homeView(parameterList);
};

const onResetButtonPress = (parameterList) => {
  const { setShouldShow } = parameterList;
  setShouldShow(true);
  homeView(parameterList);
};

const selectPlaceNameRandomly = (parameterList) => {
  const { places, setPlaceName } = parameterList;

  const randomNumber = Math.floor(Math.random(places.length) * 10); // generate number from 0 up to the places.length.

  places.map((data, index) => {
    if (randomNumber == index) {
      setPlaceName(data.name);
    }
  });
};
