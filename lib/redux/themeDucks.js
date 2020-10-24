//      
import React from "react";
import produce from "immer";
import { call, put, takeEvery, delay, select } from "redux-saga/effects";
import { createAction, createReducer } from "@reduxjs/toolkit";
import { getSunset, getSunrise } from "sunrise-sunset-js";
import * as Location from "expo-location";
import { Alert, YellowBox } from "react-native";
import moment from "moment";

const AUTO_THEME_TOGGLE_REQUEST         =
  "themeDucks/AUTO_THEME_TOGGLE_REQUEST";
const AUTO_THEME_TOGGLE_SUCCESS         =
  "themeDucks/AUTO_THEME_TOGGLE_SUCCESS";
const AUTO_THEME_TOGGLE_ERROR         = "themeDucks/AUTO_THEME_TOGGLE_ERROR";
const AUTO_THEME_TOGGLE_DAY         = "themeDucks/AUTO_THEME_TOGGLE_DAY";
const AUTO_THEME_TOGGLE_NIGHT         = "themeDucks/AUTO_THEME_TOGGLE_NIGHT";

export const autoThemeToggleRequest = createAction(AUTO_THEME_TOGGLE_REQUEST);
export const autoThemeToggleSuccess = createAction(AUTO_THEME_TOGGLE_SUCCESS);
export const autoThemeToggleError = createAction(AUTO_THEME_TOGGLE_ERROR);
export const autoThemeToggleDay = createAction(AUTO_THEME_TOGGLE_DAY);
export const autoThemeToggleNight = createAction(AUTO_THEME_TOGGLE_NIGHT);

const initialState = {
  theme: "light",
};

// toggling theme according to sunset & sunrise time of the location
const getPermission = async ()      => {
  let errorMsg;
  const { status } = await Location.requestPermissionsAsync();
  if (status !== "granted") {
    errorMsg = "Permission to access location was denied";
    Alert.alert(
      "자동 테마변경을 사용할 수 없습니다.",
      "사용하시려면 수동으로 설정해 주시기 바랍니다."
    );
  }

  return status;
};

const getLocation = async ()      => {
  const permission = await getPermission();
  if (permission === "granted") {
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();
    console.log("permission granted");
    return { latitude, longitude };
  }
  console.log("null");
  return null;
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(autoThemeToggleRequest, (state, action) => {})
    .addCase(autoThemeToggleSuccess, (state, action) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    })
    .addCase(autoThemeToggleDay, (state, action) => {
      state.theme = "light";
    })
    .addCase(autoThemeToggleNight, (state, action) => {
      state.theme = "dark";
    })
    .addCase(autoThemeToggleError, (state, action) => {})
    .addDefaultCase((state, action) => {})
);

function* toggleThemeByTime() {
  const geolocation = yield call(getLocation);
  console.log(geolocation);
  if (geolocation !== null) {
    while (1) {
      const { latitude, longitude } = geolocation;
      const sunset = moment(getSunset(latitude, longitude));
      const sunrise = moment(getSunrise(latitude, longitude));

      if (moment().isBetween(sunrise, sunset)) {
        yield put(autoThemeToggleDay());
      } else {
        yield put(autoThemeToggleNight());
      }
      yield delay(60000);
    }
  } else {
    console.log("error");
    yield put(autoThemeToggleError());
  }
}

export function* themeSaga()         {
  yield takeEvery(AUTO_THEME_TOGGLE_REQUEST, toggleThemeByTime);
}
