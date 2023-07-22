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
} from 'react-native';
import logoBG from '../assets/img/photo-bg.jpg';
import { useState } from 'react';

const initialState = {
  login: '',
  email: '',
  password: '',
};

export function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dataInput, setDataInput] = useState(initialState);

  function onShowKeyboard() {
    setIsShowKeyboard(true);
  }

  function onHideKeyboard() {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  }

  function onSubmit() {
    if (!dataInput.login || !dataInput.email || !dataInput.password)
      return console.warn('Please fill in all fields!');

    onHideKeyboard();
    console.log('state :>> ', dataInput);
    setDataInput(initialState);
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onHideKeyboard}>
        <ImageBackground style={styles.imageBG} source={logoBG}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 50 : 0,
              }}
            >
              <View>
                <Text style={styles.titleForm}>Реєстрація</Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>Login</Text>
                <TextInput
                  style={styles.input}
                  textAlign="center"
                  onFocus={onShowKeyboard}
                  value={dataInput.login} // передаем данные из state
                  onChangeText={value =>
                    setDataInput(prev => ({ ...prev, login: value }))
                  } // записываем данные в state
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <Text style={styles.inputTitle}>E-Mail</Text>
                <TextInput
                  style={styles.input}
                  textAlign="center"
                  onFocus={onShowKeyboard}
                  value={dataInput.email}
                  onChangeText={value =>
                    setDataInput(prev => ({ ...prev, email: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput
                  style={styles.input}
                  textAlign="center"
                  secureTextEntry={true}
                  onFocus={onShowKeyboard}
                  value={dataInput.password}
                  onChangeText={value =>
                    setDataInput(prev => ({ ...prev, password: value }))
                  }
                />
              </View>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.8}
                onPress={onSubmit}
              >
                <Text style={styles.btnTitle}>Зареєструватися</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageBG: {
    flex: 1,
    resizeMode: 'cover',
    // alignItems: "center",
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    // color: "#212121",
    fontSize: 20,
  },

  form: {
    marginHorizontal: 16,
  },
  titleForm: {
    // fontFamily: 'RobotoBold',
    fontSize: 30,
    fontWeight: 500,
    color: '#fff',
    // color: "#212121",
    textAlign: 'center',
  },
  inputTitle: {
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    height: 50,
    borderRadius: 6,
    color: '#fff',
    // color: "#212121", // по макету
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6C00',
    height: 50,
    borderRadius: 100,
    marginTop: 43,
  },
  btnTitle: {
    fontSize: 16,
    color: '#fff',
  },
});

/*

- KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} - // fix перекриття клавіатурою форми
- TouchableWithoutFeedback onPress={Keyboard.dismiss} -- клавіатура знікає при дотику будь де по екрану

*/
