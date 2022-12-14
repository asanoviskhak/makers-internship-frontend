import React, { FC, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store";
import { registerBoard } from "../../../store/actions/boardActions";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { useHistory } from "react-router-dom";
import Textarea from "../../UI/Textarea";
import Message from "../../UI/Message";
import { setError } from "../../../store/actions/pageActions";

const BoardRegister: FC = () => {
  let history = useHistory();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { error, submitted } = useAppSelector((state: RootState) => state.page);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(""));
      }
    };
  }, [error, dispatch]);

  useEffect(() => {
    if (submitted) {
      history.push("/dashboard");
    }
  }, [submitted, history]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (error) {
      dispatch(setError(""));
    }
    setLoading(true);
    if (user) {
      dispatch(
        registerBoard({ title, content }, user, () => setLoading(false))
      );
    }
  };

  return (
    <section>
      <div className="container">
        <h2 className="has-text-centered is-size-2 mb-3">Create a new post</h2>
        <form className="form" onSubmit={submitHandler}>
          {error && <Message type="danger" msg={error} />}
          <Input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            placeholder="Amazing post..."
            label="Title"
          />
          <Textarea
            className="is-primary is-medium"
            name="content"
            value={content}
            onChange={(e) => setContent(e.currentTarget.value)}
            placeholder="Write here"
            label="Content"
          />
          <Button
            text={loading ? "Loading..." : "Submit"}
            className="is-primary is-fullwidth mt-5"
            disabled={loading}
          />
        </form>
      </div>
    </section>
  );
};

export default BoardRegister;
