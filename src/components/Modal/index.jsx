import { View, Text, Modal, TouchableOpacity, Button } from "react-native";
import React from "react";
import tw from "twrnc";
import { AddIcon } from "../Icons";
import EditorText from '../EditorText';

const Modals = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View>
      <TouchableOpacity
        style={tw`rounded bg-zinc-100 dark:bg-black p-3`}
        onPress={() => {
          setModalVisible(true);
          console.log("Agregar nota");
        }}
      >
        <AddIcon style={tw`text-xl text-zinc-900 dark:text-zinc-100`} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={tw`flex-1 justify-center items-center bg-gray-800 bg-opacity-50`}
        >
          <View style={tw`w-full h-3/4 bg-white p-5 rounded-lg`}>
            <Text style={tw`text-lg font-bold mb-4`}>Modal Title</Text>
            <EditorText />
            <Button
              title="Close Modal"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Modals;
