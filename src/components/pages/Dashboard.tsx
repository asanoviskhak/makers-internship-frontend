import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import Message from "../UI/Message";
import { RootState } from "../../store";
import { setSuccess } from "../../store/actions/pageActions";
import BoardList from "./board/BoardList";

const Dashboard: FC = () => {
  const { user, needVerification } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { success } = useAppSelector((state: RootState) => state.page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(""));
    }
  }, [success, dispatch]);

  return (
    <section className="section">
      <div className="container">
        {needVerification && (
          <Message type="success" msg="Please verify your email address." />
        )}
        <h1 className="is-size-1 mb-3">Welcome {user?.firstName}</h1>
        <BoardList />
      </div>
    </section>
  );
};

export default Dashboard;
