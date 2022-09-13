import React, { useCallback, useState } from "react";
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
  },
  bottomMenuResetWrapper: {
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

export default () => {
  const [shouldShow, setShouldShow] = useState(true);
  const [places, setPlaces] = useState([]);

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
  };
  return <View onLayout={onLayoutRootView}>{homeView(parameterList)}</View>;
};

// ****************************FUNCTIONS************************************************************
function _______________________________________________________________() {}

function homeView(parameterList) {
  const { homeViewComponentData, shouldShow, places } = parameterList;
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
            <View style={{ backgroundColor: Colors.black }}>
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
                  <Text style={styles.showLocationText}>
                    MARVINS SWIMMING POOL
                  </Text>
                </View>
              ) : null}
            </View>

            {/* Menu */}
            <View style={styles.bottomScreenLayoutWrapper}>
              <View style={styles.bottomMenuLayoutWrapper}>
                <View style={styles.bottomMenuResetWrapper}>
                  <TouchableOpacity
                    onPress={() => onResetButtonPress(parameterList)}
                  >
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
                  </TouchableOpacity>
                </View>
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
  homeView(parameterList);
};

const onResetButtonPress = (parameterList) => {
  const { places, setPlaces, setShouldShow } = parameterList;
  setShouldShow(true);
  homeView(parameterList);
  // saveDataToFirebaseDatabase(place);
  // updateDataToDatabase(place);
  // deleteDataToDatabase(place);
  fetchDatafromDatabase(places, setPlaces);
};
