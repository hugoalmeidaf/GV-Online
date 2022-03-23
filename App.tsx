import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CartaoGV from './cartao_gv';

export default function App() {
  return (
    <View style={styles.container}>
      <CartaoGV></CartaoGV>
      <StatusBar style='light' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C466C',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 60
  },
  statusBar: {
    backgroundColor: '#2C466C',
  }
});
