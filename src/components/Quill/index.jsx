// import React from 'react';
// import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
// import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';

// export default function Quill() {
//   const _editor = React.createRef();

//   return (
//     <SafeAreaView style={styles.root}>
//       <StatusBar style="auto" />
//       <QuillEditor
//         style={styles.editor}
//         ref={_editor}
//         initialHtml="<h1>Quill Editor for react-native</h1>"
//       />
//       <QuillToolbar editor={_editor} options="full" theme="light" />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//     backgroundColor: '#eaeaea',
//   },
//   editor: {
//     flex: 1,
//     padding: 0,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginHorizontal: 30,
//     marginVertical: 5,
//     backgroundColor: 'white',
//   },
// });