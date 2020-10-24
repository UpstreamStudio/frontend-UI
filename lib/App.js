//      
import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import React, { useEffect } from "react";
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
// import { composeWithDevTools } from "redux-devtools-extension";
import { Provider, useDispatch, useSelector } from "react-redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootReducer, { rootSaga } from "./redux/rootReducer";
import { autoThemeToggleRequest } from "./redux/themeDucks";
// components
import AppContainer from "./containerScreens/AppContainer";
// enable immerjs
enableAllPlugins();

const sagaMiddleware = createSagaMiddleware();

// configuring store

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware, logger],
  devTools: true,
  enhancers: [],
});

sagaMiddleware.run(rootSaga);

const App = ()      => {
  const { theme } = useSelector((state) => ({
    theme: state.themeReducer.theme,
  }));

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(autoThemeToggleRequest());
  }, []);

  // const toggleTheme = () => {
  //   const nextTheme = (theme) => (theme === "light" ? "dark" : "light");
  //   setTheme(nextTheme);
  // };

  return (
    <React.Fragment>
      <SafeAreaProvider>
        {/* <ThemeContext.Provider value={{ theme, toggleTheme }}> */}
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva[theme], ...themeColors }}>
          <AppContainer />
        </ApplicationProvider>
        {/* </ThemeContext.Provider> */}
      </SafeAreaProvider>
    </React.Fragment>
  );
};

const wrapApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
export default wrapApp;

registerRootComponent(wrapApp);
