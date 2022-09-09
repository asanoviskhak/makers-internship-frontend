import React, { FC, Suspense, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import Header from "./components/sections/Header";

import ForgotPassword from "./components/pages/ForgotPassword";
import Loader from "./components/UI/Loader";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

import { getUserById, setNeedVerification } from "./store/actions/authActions";
import { RootState } from "./store";
import BoardRegister from "./components/pages/board/BoardRegister";
import BoardEdit from "./components/pages/board/BoardEdit";
import { startLoading, endLoading } from "./store/actions/pageActions";
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";
import { useAppDispatch, useAppSelector } from "./store/hooks";

const SignIn = React.lazy(() => import("./components/pages/SignIn"));
const SignUp = React.lazy(() => import("./components/pages/SignUp"));
const Homepage = React.lazy(() => import("./components/pages/Homepage"));
const Dashboard = React.lazy(() => import("./components/pages/Dashboard"));

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.page);

  // Check if user exists
  useEffect(() => {
    dispatch(startLoading);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(startLoading);
        await dispatch(getUserById(user.uid));
        if (!user.emailVerified) {
          dispatch(setNeedVerification());
        }
      }
      dispatch(endLoading);
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" component={Homepage} exact />
          <PublicRoute path="/signup" component={SignUp} exact />
          <PublicRoute path="/signin" component={SignIn} exact />
          <PublicRoute
            path="/forgot-password"
            component={ForgotPassword}
            exact
          />
          <PrivateRoute path="/dashboard" component={Dashboard} exact />
          <PrivateRoute path="/register" component={BoardRegister} exact />
          <PrivateRoute path="/edit/:id" component={BoardEdit} />
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
