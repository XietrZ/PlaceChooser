import React, { createContext, useState, useEffect } from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";

import { fetchDatafromDatabase } from "../config/Firebase.jsx";

// --> Create variable and use createContext()
export const ConversionContext = createContext();

export const ConversionContextProvider = ({ children }) => {
  const [shouldShow, setShouldShow] = useState(true);
  const [placeName, setPlaceName] = useState("FUCK");
  const [selectedPlace, setSelectedPlace] = useState("YAWA SHIT");
  const [selectedPlaceID, setSelectedPlaceID] = useState("temp id");

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetchDatafromDatabase(setPlaces);
  }, []);

  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditPlaceModal, setShowEditPlaceModal] = useState(false);

  const [addPlaceText, setAddPlaceText] = useState("");

  const contextValue = {
    shouldShow,
    setShouldShow,
    places,
    setPlaces,
    placeName,
    setPlaceName,
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

  return (
    <ConversionContext.Provider value={contextValue}>
      {children}
    </ConversionContext.Provider>
  );
};
