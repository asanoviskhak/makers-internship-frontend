import React, { FC } from "react";
import { useAppSelector } from "../../store/hooks";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { RootState } from "../../store";

interface Props extends RouteProps {
  component: any;
}

const PublicRoute: FC<Props> = ({ component: Component, ...rest }) => {
  const { authenticated } = useAppSelector((state: RootState) => state.auth);
  // const location = useLocation<{next: string}>()
  // const history = useHistory()

  return (
    //@ts-ignore
    <Route
      {...rest}
      render={(props) =>
        !authenticated ? <Component {...props} /> : <Redirect to="/dashboard" />
      }
    />
  );
};

export default PublicRoute;
