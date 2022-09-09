import { FC, ReactElement, useEffect } from "react";
import { RootState } from "../../../store";
import {
  fetchBoardAll,
  deleteBoardById,
} from "../../../store/actions/boardActions";
import { Board } from "../../../store/types";
import { useHistory } from "react-router-dom";
import BoardCard from "../../UI/BoardCard";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

const BoardList: FC = () => {
  const dispatch = useAppDispatch();
  const { boardList, authorList } = useAppSelector(
    (state: RootState) => state.board
  );
  const { user } = useAppSelector((state: RootState) => state.auth);
  const history = useHistory();
  useEffect(() => {
    dispatch(fetchBoardAll());
  }, [dispatch]);

  const boardDeleteHandler = (id: string) => {
    console.log(id);
    dispatch(deleteBoardById(id));
  };

  const boardEditHandler = (id: string) => {
    history.push(`/edit/${id}`);
  };

  if (!boardList) {
    return <p>Loading...</p>;
  }
  if (boardList.length === 0) {
    return <p>No boards found.</p>;
  }
  return (
    <div className="mt-5 columns is-multiline">
      {boardList &&
        boardList.map((board: Board) => {
          return (
            <div
              key={board.id}
              className="column is-6-tablet is-4-desktop is-12-mobile"
            >
              <BoardCard
                id={board.id}
                content={board.content}
                title={board.title}
                author={board.author}
                deleteBoard={boardDeleteHandler}
                editBoard={boardEditHandler}
                authorList={authorList}
              />
            </div>
          );
        })}
    </div>
  );
};

export default BoardList;
