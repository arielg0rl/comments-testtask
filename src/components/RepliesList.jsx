import React from "react";

export const RepliesList = ({ replies, toName }) => {
  return (
    <div>
      {
        replies.map(reply => {
          const fullDate = new Date(reply.date);
          const date = fullDate.toLocaleDateString();
          return (
            <div>
              <img src={reply.avatar} alt="replyer's avatar" />
              <div>{reply.name}</div>
              <div>{`to ${toName}`}</div>
              <div>{date}</div>
              <div>{reply.body}</div>
            </div>
          )
        })
      }
    </div>
  )
}