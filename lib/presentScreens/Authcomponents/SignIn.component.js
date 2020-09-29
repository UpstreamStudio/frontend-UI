//      
import React, { useEffect, useState } from "react";
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
    justifyContent: "flex-start",
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

export const SignInScreen = (props        ) => {
  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const onSignIn = props.onSignIn;

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
      edges={["top", "left", "right"]}
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
              value={username}
              onChangeText={(nextValue) => setUsername(nextValue)}
              accessoryRight={PersonIcon}
            />

            <Input
              style={styles.input}
              value={password}
              placeholder="Password"
              accessoryRight={renderIcon}
              secureTextEntry={secureTextEntry}
              onChangeText={(nextValue) => setPassword(nextValue)}
            />
          </View>
          <View
            style={{
              ...styles.buttonView,
            }}
          >
            <Button
              style={styles.button}
              onPress={() => {
                onSignIn(username, password);
                setUsername("");
                setPassword("");
              }}
            >
              <Text style={styles.buttonText}>SIGN IN</Text>
            </Button>
          </View>
        </View>
      </Layout>
    </SafeAreaView>
  );
};
