import { FC, ReactElement, useEffect, useRef } from "react";
import { db } from "../../firebase/config";
import { getDoc, doc } from "firebase/firestore";
import { Author } from "../../store/types";
import { addAuthor } from "../../store/actions/boardActions";
import { useAppDispatch } from "../../store/hooks";

interface CardProps {
  id: string;
  title: string;
  author: string;
  content?: string;
  deleteBoard?: (id: string) => void;
  editBoard?: (id: string) => void;
  authorList: Author[];
}

const BoardCard: FC<CardProps> = ({
  title,
  author,
  content,
  deleteBoard,
  editBoard,
  id,
  authorList,
}) => {
  const authorRef = useRef<HTMLParagraphElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorList.find((authorEl) => authorEl.id === author)) {
      const authorEl = authorList.find((authorEl) => authorEl.id === author);
      if (authorRef.current) {
        authorRef.current.innerHTML = `${authorEl?.firstName} - <a href="mailto:${authorEl?.email}">${authorEl?.email}</a>`;
      }
    } else {
      getDoc(doc(db, "users", author)).then((doc) => {
        if (doc.exists()) {
          if (authorRef.current) {
            authorRef.current.innerHTML = `${
              doc.data()?.firstName
            } - <a href="mailto:${doc.data()?.email}">${doc.data()?.email}</a>`;
            const authorObj: Author = {
              id: doc.id,
              firstName: doc.data()?.firstName,
              email: doc.data()?.email,
            };
            dispatch(addAuthor(authorObj));
          }
        }
      });
    }
  }, [author]);
  return (
    <div className="card">
      <div className="card-content">
        <p className="title">{title}</p>
        <p className="content">{content}</p>
        <p ref={authorRef} className="subtitle">
          Unknown
        </p>
      </div>
      <footer className="card-footer">
        <p className="card-footer-item">
          <span>
            <button
              className="button is-text"
              onClick={() => {
                let confirm = window.confirm("Are you sure?");
                if (deleteBoard && confirm) {
                  deleteBoard(id);
                }
              }}
            >
              Delete
            </button>
          </span>
        </p>
        <p className="card-footer-item">
          <span>
            <button
              className="button is-ghost"
              onClick={() => {
                if (editBoard) {
                  editBoard(id);
                }
              }}
            >
              Edit
            </button>
          </span>
        </p>
      </footer>
    </div>
  );
};

export default BoardCard;
