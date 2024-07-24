import React, { useRef } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import QuillEditor, { QuillToolbar } from "react-native-cn-quill";
import tw from "twrnc";

const EditorText = ({ initialContent, onHtmlChange }) => {
  const _editor = useRef();

  return (
    <SafeAreaView style={tw`flex-1 bg-[#eaeaea]`}>
      <StatusBar style="auto" />
      <View style={tw`border-b border-gray-400 bg-white`}>
        <QuillToolbar editor={_editor} options="full" theme="light" />
      </View>
      <QuillEditor
        style={tw`flex-1 p-2 border border-gray-400 bg-white`}
        ref={_editor}
        initialHtml={initialContent}
        onEditorChange={(html) => onHtmlChange(html)}
      />
    </SafeAreaView>
  );
};

export default EditorText;
