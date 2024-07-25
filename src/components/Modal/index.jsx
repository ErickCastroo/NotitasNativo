import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import tw from "twrnc";
import { CloseIcon } from "../Icons";
import EditorText from "../EditorText";

const Modals = ({ visible, onClose, title, content, setTitle, setContent }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={tw`flex-1 justify-center items-center bg-gray-800 bg-opacity-50`}
      >
        <View style={tw`w-full h-3/4 bg-white p-5 rounded-lg`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <TouchableOpacity
              style={tw`rounded bg-zinc-100 dark:bg-black p-2`}
              onPress={onClose}
            >
              <CloseIcon style={tw`text-xl text-zinc-900 dark:text-zinc-100`} />
            </TouchableOpacity>
            <TextInput
              style={tw`flex-1 text-lg font-bold text-start mx-2 border-b border-gray-300`}
              value={title}
              onChangeText={setTitle}
            />
            <TouchableOpacity
              style={tw`rounded bg-zinc-100 dark:bg-black p-2 mr-2`}
              onPress={onClose}
            >
              <CloseIcon style={tw`text-xl text-zinc-900 dark:text-zinc-100`} />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`rounded bg-zinc-100 dark:bg-black p-2 mr-2`}
              onPress={onClose}
            >
              <CloseIcon style={tw`text-xl text-zinc-900 dark:text-zinc-100`} />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`rounded bg-zinc-100 dark:bg-black p-2 mr-2`}
              onPress={onClose}
            >
              <CloseIcon style={tw`text-xl text-zinc-900 dark:text-zinc-100`} />
            </TouchableOpacity>
            <View style={tw`w-8`} />
          </View>
          <EditorText initialContent={content} onHtmlChange={setContent} />
        </View>
      </View>
    </Modal>
  );
};

export default Modals;
