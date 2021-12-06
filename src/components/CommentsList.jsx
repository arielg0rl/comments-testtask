import React, { useState } from 'react';
import { Comment } from "./Comment";

export const CommentsList = ({ comments }) => {
  return (
    <div>
      {
        comments.map(comment => <Comment comment={comment} />)
      }
    </div>
  )
}