import React, { FC, useState, FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import Input from "../UI/Input";
import Button from "../UI/Button";
import Message from "../UI/Message";
import { sendPasswordReset } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { setError, setSuccess } from "../../store/actions/pageActions";

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { error, success } = useAppSelector((state: RootState) => state.page);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(""));
      }
      if (success) {
        dispatch(setSuccess(""));
      }
    };
  }, [error, dispatch, success]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (success) {
      dispatch(setSuccess(""));
    }
    if (error) {
      dispatch(setError(""));
    }
    setLoading(true);
    await dispatch(sendPasswordReset(email, "Email sent!"));
    setLoading(false);
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="has-text-centered is-size-2 mb-3">Reset password</h2>
        <form className="form" onSubmit={submitHandler}>
          {error && <Message type="danger" msg={error} />}
          {success && <Message type="success" msg={success} />}
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Email address"
            label="Email address"
          />
          <Button
            text={loading ? "Loading..." : "Send password reset email"}
            className="is-primary is-fullwidth mt-5"
            disabled={loading}
          />
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
