import React, { FC } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import Button from "../UI/Button";
import { RootState } from "../../store";
import { signout } from "../../store/actions/authActions";

const Header: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { authenticated } = useAppSelector((state: RootState) => state.auth);

  const logoutClickHandler = () => {
    dispatch(signout());
  };

  return (
    <nav className="navbar is-spaced has-shadow">
      <div className="container">
        <div className="navbar-brand">
          <Link
            className="navbar-item"
            to={!authenticated ? "/" : "/dashboard"}
          >
            Wall
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!user ? (
                <>
                  <Button
                    text="Sign up"
                    onClick={() => history.push("/signup")}
                    className="is-primary"
                  />
                  <Button
                    text="Sign in"
                    onClick={() => history.push("/signin")}
                  />
                </>
              ) : (
                <>
                  <Button
                    className="is-link"
                    text="Dashboard"
                    onClick={() => history.push("/register")}
                  />
                  <Button text="Sign out" onClick={logoutClickHandler} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
