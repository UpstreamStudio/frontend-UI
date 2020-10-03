// @flow
import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import React from "react";
import { enableAllPlugins } from "immer";
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
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeContext } from "./theme-context";
// redux
import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootReducer, { rootSaga } from "./redux/rootReducer";
// components
import AppContainer from "./containerScreens/AppContainer";

// enable immerjs
enableAllPlugins();

const sagaMiddleware = createSagaMiddleware();

// configuring store
const middlewares = [sagaMiddleware, logger];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware, logger],
  devTools: true,
  enhancers: [composedEnhancers],
});

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
// );

sagaMiddleware.run(rootSaga);

const App = (): any => {
  const [theme: string, setTheme] = React.useState("light");

  const toggleTheme = () => {
    const nextTheme = (theme) => (theme === "light" ? "dark" : "light");
    setTheme(nextTheme);
  };

  return (
    <Provider store={store}>
      <React.Fragment>
        <SafeAreaProvider>
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider
              {...eva}
              theme={{ ...eva[theme], ...themeColors }}
            >
              <AppContainer />
            </ApplicationProvider>
          </ThemeContext.Provider>
        </SafeAreaProvider>
      </React.Fragment>
    </Provider>
  );
};

export default App;

registerRootComponent(App);
