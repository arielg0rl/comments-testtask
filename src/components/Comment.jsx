import React, { useState, useEffect } from 'react';
import { RepliesList } from './RepliesList';
import { DeleteComment } from '../api';
import { newReply } from '../api';
import { getRepliesByCommentId } from '../api';
import { editComment } from '../api';

export const Comment = ({ comment }) => {
  const [reply, setReply] = useState(false);
  const [isCommentDeleted, setIsCommentDeleted] = useState(false);
  const [replies, setReplies] = useState(comment.replies);
  const [replyText, setReplyText] = useState('');
  const [openEditInput, setOpenEditInput] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.body);
  const [shouldRerender, setShouldRerender] = useState(false);

  const handleReply = () => {
    setReply(true);
  }

  const handleCancelReply = () => {
    setReply(false);
    setReplyText('');
  }

  const handleDelete = (event) => {
    event.preventDefault();

    if (comment.id !== 1) {
      DeleteComment(comment.id);
      setIsCommentDeleted(true);
    }
    alert('NO NON NO NONOO no deleting comments please')
  }

  const sendReply = (event) => {
    event.preventDefault();

    newReply(comment.id, replyText);
    getRepliesByCommentId(comment.id).then(res => setReplies(res));
    setShouldRerender(!shouldRerender);
    setReply(false);
  }

  const handleEdit = (event) => {
    setOpenEditInput(true);
  }

  const saveEditedComment = () => {
    editComment(comment.id, editedComment);
    setShouldRerender(!shouldRerender);
    comment.body = editedComment;
    setOpenEditInput(false);
  }

  useEffect(() => {
    getRepliesByCommentId(comment.id).then(res => setReplies(res));
  }, [shouldRerender, isCommentDeleted]);

  const fullDate = new Date(comment.date);
  const date = fullDate.toLocaleDateString().split('.').join('-');

  return (!isCommentDeleted && (
    <div className="comment">
      <img src={comment.avatar} alt="replyer's avatar" />
      <div className="comment__section">
        <div className="comment__name-date">
          <div className="comment__name">{comment.name}</div>
          <div className="comment__date">{date}</div>
        </div>
        {
          openEditInput ? (
            <div className="comment-form__container">
              <textarea
                placeholder="your words of wisdom here lol"
                className="comment-form__input"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                type="text"
              />
              <button
                className="comment-form__button button"
                onClick={saveEditedComment}
                className="comment-form__button"
                type="submit"
              >
                Send
              </button>
            </div>
          ) 
          : 
          <div>
            <div className="comment__text">{comment.body}</div>
            <div className="comment__buttons-container">
            <button
              className="comment__buttons"
              type="submit"
              value
              onClick={handleEdit}
            >
              Edit
            </button>

            <button
              className="comment__buttons"
              type="submit"
              onClick={handleDelete}
            >
              Delete
            </button>

            <button
              className="comment__buttons"
              type="submit"
              onClick={handleReply}
            >
              Reply
            </button>
          </div>
          {
            reply && (
              <div className="reply">
                <div className="reply__buttons">
                  <div className="reply__to-whom comment__buttons">
                    {`to ${comment.name}`}
                  </div>
                  <button
                    className="comment__buttons comment__cancel-button"
                    type="submit"
                    onClick={handleCancelReply}
                  >
                    Cancel
                  </button>
                </div>

                <div className="comment-form">
                  <div className="comment-form__container">
                    <textarea
                      value={replyText}
                      onChange={(event) => setReplyText(event.target.value)}
                      className="comment-form__input"
                      type="text"
                    />
                    <button
                      className="comment-form__button button"
                      onClick={sendReply}
                      type="submit"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )
          }
          </div>
        }
        {
          comment.replies && <RepliesList toName={comment.name} replies={replies}/>
        }
      </div>
    </div>
  ))
}
