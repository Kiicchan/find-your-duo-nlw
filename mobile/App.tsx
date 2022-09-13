import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello Expo!</Text>

      <Button title="Send 1"></Button>
      <Button title="Send 2"></Button>
      <Button title="Send 3"></Button>
      <Button title="Send 4"></Button>

      <StatusBar style="auto" backgroundColor='#CCC' />
    </View>
  );
}

interface ButtonProps {
  title: string
}

function Button(props: ButtonProps) {
  return (
    <TouchableOpacity>
      <Text>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
