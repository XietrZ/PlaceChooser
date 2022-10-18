import React from "react";
import {
  View,
  Modal,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";

import Colors from "../constants/Colors";
import {
  saveDataToFirebaseDatabase,
  deleteDataToDatabase,
} from "../config/Firebase.jsx";

const screen = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screen.width,
    // backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  addPanelWrapper: {
    alignItems: "center",
    width: screen.width - 20,
    height: 224,
    backgroundColor: Colors.gray_2,
    borderRadius: 20,
  },
  addTextWrapper: {
    fontFamily: "Roboto-Regular",
    fontSize: 24,
    color: Colors.white_2,
    paddingTop: 10,
  },
  inputFieldWrapper: {
    borderWidth: 4,
    borderColor: Colors.orange,
    width: 301,
    height: 52,
    justifyContent: "center",
  },
  textInputWrapper: {
    color: Colors.textInput,
    fontFamily: "Roboto-Regular",
    fontSize: 18,
    paddingLeft: 5,
  },
  bottomButtonsWrapper: {
    // backgroundColor: Colors.orange,
    width: screen.width - 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
  },
  singleButtonWrapper: {
    width: 78,
    height: 79,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.menuIcon,
    borderWidth: 1,
    borderRadius: 10,
  },
  textButtonWrapper: {
    color: Colors.orange,
    fontFamily: "Roboto-Regular",
    fontSize: 15,
  },
  selectedPlaceModalPanelWrapper: {
    alignItems: "center",
    width: screen.width - 20,
    height: 180,
    backgroundColor: Colors.gray_2,
    borderRadius: 20,
  },
  selectedPlaceWrapper: {
    fontFamily: "Roboto-Regular",
    fontSize: 24,
    color: Colors.white_2,
    paddingTop: 32,
  },
});
function _________________________________() {}
export default ({ parameterList }) => {
  const { showAddModal, setShowAddModal, addPlaceText, setAddPlaceText } =
    parameterList;
  return showAddPlaceModal({
    showAddModal,
    setShowAddModal,
    addPlaceText,
    setAddPlaceText,
  });
};

//********************************************************************************************* */
function ________________________________() {}
/**
 * Show Add Place Modal
 * @param {} param0
 * @returns
 */
function showAddPlaceModal({
  showAddModal,
  setShowAddModal,
  addPlaceText,
  setAddPlaceText,
}) {
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={showAddModal}>
        <View style={styles.container}>
          <View style={styles.addPanelWrapper}>
            <Text style={styles.addTextWrapper}>Add Place</Text>
            {/* Input Field */}
            <View style={{ paddingTop: 20 }}>
              <View style={styles.inputFieldWrapper}>
                <TextInput
                  style={styles.textInputWrapper}
                  placeholder="Enter Place"
                  value={addPlaceText}
                  //   onChangeText={(newText) => setAddPlaceText(newText)}
                  onChangeText={setAddPlaceText}
                ></TextInput>
              </View>
            </View>
            <View style={{ paddingTop: 19 }}>
              <View style={styles.bottomButtonsWrapper}>
                {/* Add Button */}
                <TouchableOpacity
                  onPress={() => {
                    savePlace(addPlaceText, setAddPlaceText, setShowAddModal);
                  }}
                >
                  <View style={styles.singleButtonWrapper}>
                    <Text style={styles.textButtonWrapper}>Save</Text>
                  </View>
                </TouchableOpacity>

                {/* Cancel Button */}
                <TouchableOpacity
                  onPress={() => {
                    setShowAddModal(false);
                    setAddPlaceText("");
                  }}
                >
                  <View style={styles.singleButtonWrapper}>
                    <Text style={styles.textButtonWrapper}>Cancel</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export const ShowEditPlaceModal = ({ parameterList }) => {
  const {
    showEditPlaceModal,
    setShowEditPlaceModal,
    selectedPlace,
    selectedPlaceID,
  } = parameterList;

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showEditPlaceModal}
      >
        <View style={styles.container}>
          <View style={styles.selectedPlaceModalPanelWrapper}>
            {/* SHOW SELECTED PLACE */}
            <Text style={styles.selectedPlaceWrapper}>{selectedPlace}</Text>

            {/* BUTTON Panel */}
            <View style={{ paddingTop: 25 }}>
              <View style={styles.bottomButtonsWrapper}>
                {/* DELETE Button */}
                <TouchableOpacity
                  onPress={() => {
                    deletePlace(
                      selectedPlace,
                      setShowEditPlaceModal,
                      selectedPlaceID
                    );
                  }}
                >
                  <View style={styles.singleButtonWrapper}>
                    <Text style={styles.textButtonWrapper}>Delete</Text>
                  </View>
                </TouchableOpacity>

                {/* CANCEL Button */}
                <TouchableOpacity
                  onPress={() => {
                    setShowEditPlaceModal(false);
                  }}
                >
                  <View style={styles.singleButtonWrapper}>
                    <Text style={styles.textButtonWrapper}>Cancel</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

function savePlace(addPlaceText, setAddPlaceText, setShowAddModal) {
  // the second paramater checks if the user only inputs ALL SPACES
  if (addPlaceText == "" || addPlaceText.trim().length === 0) {
    alert("You did not input any place!");
  } else {
    setShowAddModal(false);
    saveDataToFirebaseDatabase(addPlaceText);
  }
  setAddPlaceText("");
}

function deletePlace(selectedPlace, setShowEditPlaceModal, selectedPlaceID) {
  // alert("Delete: " + selectedPlace);
  setShowEditPlaceModal(false);
  deleteDataToDatabase(selectedPlace, selectedPlaceID);
}
