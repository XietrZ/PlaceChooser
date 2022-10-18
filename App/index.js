import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./screens/Home";
import Places from "./screens/Places";
import { ConversionContextProvider } from "./util/GlobalStateVariables";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <ConversionContextProvider>
        <Stack.Navigator>
          {/* <Stack.Navigator initialRouteName="Places"> */}
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Places"
            component={Places}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </ConversionContextProvider>
    </NavigationContainer>
  );
}
