//      
import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import React from "react";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
  Icon,
} from "@ui-kitten/components";
import { default as themeColors } from "./theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { SignInFrame } from "./presentScreens/SignIn.component";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeContext } from "./theme-context";
// redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux/rootReducer";

const App = ()      => {
  const [theme        , setTheme] = React.useState("light");

  const toggleTheme = () => {
    const nextTheme = (theme) => (theme === "light" ? "dark" : "light");
    setTheme(nextTheme);
  };

  return (
    <React.Fragment>
      <SafeAreaProvider>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider
            {...eva}
            theme={{ ...eva[theme], ...themeColors }}
          >
            <SignInFrame />
          </ApplicationProvider>
        </ThemeContext.Provider>
      </SafeAreaProvider>
    </React.Fragment>
  );
};

export default App;

registerRootComponent(App);
