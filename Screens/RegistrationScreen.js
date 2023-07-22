import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import logoBG from "../assets/img/photo-bg.jpg";

export function RegistrationScreen() {
  console.log(Platform.OS);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground style={styles.imageBG} source={logoBG}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
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
              <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
                <Text style={styles.btnTitle}>Зареєструватися</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
  btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    height: 50,
    borderRadius: 100,
    marginTop: 43,
  },
  btnTitle: {
    fontSize: 16,
    color: "#fff",
  },
});

/*

- KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} - // fix перекриття клавіатурою форми
- TouchableWithoutFeedback onPress={Keyboard.dismiss} -- клавіатура знікає при дотику будь де по екрану

*/
