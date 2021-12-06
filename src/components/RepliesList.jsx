import React from "react";

export const RepliesList = ({ replies, toName }) => {
  return (
    <div>
      {
        replies.map(reply => {
          const fullDate = new Date(reply.date);
          const date = fullDate.toLocaleDateString();
          return (
            <div className="reply__body" key={reply.id}>
              <img
                className="reply__avatar"
                src={reply.avatar}
                alt="replyer's avatar"
              />
              <div className="reply__text-body">
                <div className="reply__container">
                  <div className="comment__name">{reply.name}</div>
                  <div className="reply__to">{`to ${toName}`}</div>
                  <div className="reply__to">{date.split('.').join('-')}</div>
                </div>
                <div>{reply.body}</div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}