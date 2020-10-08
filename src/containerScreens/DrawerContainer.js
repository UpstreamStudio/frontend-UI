// @flow
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ULDrawers } from "../components/ULDrawer.component";
import { getUserDataError, getUserDataRequest } from "../redux/dataDucks";

function ULDrawersContainer({ navigation }: Object) {
  const { isLoading, ...students } = useSelector((state) => ({
    isLoading: state.dataReducer.isLoading,
    students: state.dataReducer.students,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDataRequest());
  }, [dispatch]);

  //유저정보를 Asyncstorage에 요청
  return <ULDrawers navigation={navigation} students={students} />;
}

export default ULDrawersContainer;
