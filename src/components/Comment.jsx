import React, { useState } from 'react';
import { RepliesList } from './RepliesList';
import { DeleteComment } from '../api';
import { newReply } from '../api';
import { getRepliesByCommentId } from '../api';

export const Comment = ({ comment }) => {
  const [reply, setReply] = useState(false);
  const [isCommentDeleted, setIsCommentDeleted] = useState(false);
  const [replies, setReplies] = useState(comment.replies);
  const [replyText, setReplyText] = useState('');

  const handleReply = () => {
    setReply(true);
  }

  const handleCancelReply = () => {
    setReply(false);
  }

  const handleDelete = (event) => {
    event.preventDefault();
    DeleteComment(comment.id);
    setIsCommentDeleted(true);
  }

  const sendReply = (event) => {
    event.preventDefault();

    newReply(comment.id, replyText);
    getRepliesByCommentId(comment.id).then(res => setReplies(res));

  }

  const fullDate = new Date(comment.date);
  const date = fullDate.toLocaleDateString();

  return (!isCommentDeleted && (
    <div>
      <img src={comment.avatar} alt="replyer's avatar" />
      <div>{comment.name}</div>
      <div>{date}</div>
      <div>{comment.body}</div>
      <div>
        <button
          type="submit"
          value
          onClick={console.log('edit')}
        >
          edit
        </button>

        <button
          type="submit"
          onClick={handleDelete}
        >
          delete
        </button>

        <button
          type="submit"
          onClick={handleReply}
        >
          reply
        </button>
      </div>
      {
        reply && (
          <div>
            <div>{`to ${comment.name}`}</div>
            <button
              type="submit"
              onClick={handleCancelReply}
            >
              cancel
            </button>

            <div className="comment-form">
              <input
                value={replyText}
                onChange={(event) => setReplyText(event.target.value)}
                className="comment-form__input"
                type="text"
              />
              <button
                onClick={sendReply}
                className="comment-form__button"
                type="submit"
              >
                send
              </button>
            </div>
          </div>
        )
      }
      {
        comment.replies && <RepliesList toName={comment.name} replies={replies}/>
      }
    </div>
  ))
}