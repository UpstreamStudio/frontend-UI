//      
import React, { useState } from "react";
import { View, Platform, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Layout,
  Text,
  Input,
  Icon,
  Button,
  useTheme,
  withStyles,
} from "@ui-kitten/components";
// import { TextButton } from "../components/TextButton.component";
// import { LoginHero } from "../components/LoginHero.component";
// import { IdInput, PassInput } from "../components/LoginInputs.component";

              
                     
  

const styles = {
  safeview: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  heroview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  herotext: {
    margin: 4,
    color: "#fff",
  },
  nothero: {
    flex: 3,
    padding: 10,
    paddingTop: 20,
  },
  inputView: {
    flex: 2,
    justifyContent: "start",
  },
  input: {
    marginVertical: 8,
  },
  buttonView: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    height: 60,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
};

const PersonIcon = (props        ) => {
  return <Icon {...props} name="person" />;
};

export const SignInFrame = (props        ) => {
  const theme = useTheme();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  return (
    <SafeAreaView
      style={{
        ...styles.safeview,
      }}
    >
      <Layout style={styles.container} level="1">
        <View
          style={{
            ...styles.heroview,
            backgroundColor: theme["color-primary-600"],
          }}
        >
          <Text style={styles.herotext} category="h1">
            Hello
          </Text>

          <Text style={styles.herotext} category="h5">
            Sign in to your account
          </Text>
        </View>

        <View style={styles.nothero}>
          <View
            style={{
              ...styles.inputView,
            }}
          >
            <Input
              style={styles.input}
              placeholder="ID"
              value={id}
              onChangeText={(nextValue) => setId(nextValue)}
              accessoryRight={PersonIcon}
            />

            <Input
              style={styles.input}
              value={pw}
              placeholder="Password"
              accessoryRight={renderIcon}
              secureTextEntry={secureTextEntry}
              onChangeText={(nextValue) => setPw(nextValue)}
            />
          </View>
          <View
            style={{
              ...styles.buttonView,
            }}
          >
            <Button style={styles.button}>
              <Text style={styles.buttonText}>SIGN IN</Text>
            </Button>
          </View>
        </View>
        {/* <View
          style={{
            ...styles.hero,
            backgroundColor: theme["color-primary-600"],
          }}
        >
          <LoginHero />
        </View>
        <View style={styles.nothero}>
          <View
            style={{
              ...styles.inputView,
            }}
          >
            <IdInput />
            <PassInput />
          </View>
          <View
            style={{
              ...styles.buttonView,
            }}
          >
            <TextButton text="SIGN IN" size="large" />
          </View>
        </View> */}
      </Layout>
    </SafeAreaView>
  );
};
