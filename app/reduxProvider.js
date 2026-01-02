"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "../redux/index";
import { initializeAuth } from "../redux/authSlice";
import { useEffect } from "react";

function InitializeAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return null;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <InitializeAuth />
      {children}
    </Provider>
  );
}