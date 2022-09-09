import React, { FC } from "react";
import { useAppSelector } from "../../store/hooks";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { RootState } from "../../store";

interface Props extends RouteProps {
  component: any;
}

const PrivateRoute: FC<Props> = ({ component: Component, ...rest }) => {
  const { authenticated } = useAppSelector((state: RootState) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { next: props.location.pathname },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
