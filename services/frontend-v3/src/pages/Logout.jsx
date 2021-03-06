import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useKeycloak } from "@react-keycloak/razzle";
import { Redirect } from "react-router";
import { clearUser } from "../redux/slices/userSlice";
import AppLayout from "../components/layouts/appLayout/AppLayout";

const Logout = () => {
  const dispatch = useDispatch();
  const [keycloak] = useKeycloak();

  const logout = useCallback(async () => {
    if (keycloak.authenticated) {
      dispatch(clearUser());
      await keycloak.logout({
        redirectUri: `${window.location.origin}/logout`,
      });
    }
  }, [dispatch, keycloak]);

  useEffect(() => {
    document.title = "logging out...";
    logout();
  }, [logout]);

  if (keycloak.authenticated) {
    return <AppLayout loading />;
  }

  return <Redirect to="/" />;
};

export default Logout;
