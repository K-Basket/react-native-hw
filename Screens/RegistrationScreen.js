import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import logoBG from "../assets/img/photo-bg.jpg";

export function RegistrationScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imageBG} source={logoBG}>
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Login</Text>
            <TextInput style={styles.input} textAlign="center" />
          </View>
          <View style={{ marginTop: 16 }}>
            <Text style={styles.inputTitle}>E-Mail</Text>
            <TextInput style={styles.input} textAlign="center" />
          </View>
          <View style={{ marginTop: 16 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              textAlign="center"
              secureTextEntry={true}
            />
          </View>
          <Button title="Зареєструватися" />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageBG: {
    flex: 1,
    resizeMode: "cover",
    // alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    // color: "#212121",
    fontSize: 20,
  },

  form: {
    marginHorizontal: 16,
  },
  inputTitle: {
    color: "#fff",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    borderRadius: 6,
    color: "#fff",
    // color: "#212121", // по макету
  },
});
