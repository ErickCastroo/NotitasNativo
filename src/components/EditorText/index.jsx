import React, { useRef } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import QuillEditor, { QuillToolbar } from "react-native-cn-quill";
import tw from "twrnc";

const EditorText = () => {
  const _editor = useRef();
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="auto" />
      <View style={styles.toolbarContainer}>
        <QuillToolbar editor={_editor} options="full" theme="light" />
      </View>
      <QuillEditor
        style={styles.editor}
        ref={_editor}
        initialHtml="<h1>Quill Editor for react-native</h1>"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#eaeaea",
  },
  toolbarContainer: {
    borderBottomWidth: 1,
    borderColor: "gray",
    backgroundColor: "#fff",
  },
  editor: {
    flex: 1,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
  },
});

export default EditorText;
