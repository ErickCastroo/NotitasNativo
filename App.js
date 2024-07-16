import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import i18next from './src/config/lang/services/i18next';
import { useTranslation } from 'react-i18next';

export default function App() {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Text>{t('home')}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
