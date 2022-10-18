import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  placeTextWrappper: {
    color: Colors.white_2,
    fontSize: 24,
    paddingLeft: 24,
    paddingVertical: 11,
  },
  separator: {
    backgroundColor: Colors.gray_4,
    height: 2,
  },
});
export const PlaceRowItem = ({ placeData, parameterList }) => {
  const {
    showEditPlaceModal,
    setShowEditPlaceModal,
    setSelectedPlace,
    setSelectedPlaceID,
  } = parameterList;
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          // alert("Edit Place: " + placeData.name);
          setSelectedPlace(placeData.name);
          setSelectedPlaceID(placeData.id);
          setShowEditPlaceModal(true);
        }}
      >
        <Text style={styles.placeTextWrappper}>{placeData.name}</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
    </View>
  );
};
