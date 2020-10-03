// @flow
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ULDrawers } from "../components/ULDrawer.component";

function ULDrawersContainer({ navigation }: Object) {
  const { isLoading, ...students } = useSelector((state) => ({
    isLoading: state.dataReducer.isLoading,
    students: state.dataReducer.students,
  }));
  return <ULDrawers navigation={navigation} students={students} />;
}

export default ULDrawersContainer;
