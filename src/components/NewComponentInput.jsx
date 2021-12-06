import React, { useState, useEffect } from 'react';
import { newComment } from "../api";

export const NewCommentInput = ({ addComment }) => {
  const [inputText, setInputText] = useState();
  const [commentAdded, setCommentAdded] = useState(0)

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  }

  const handleSending = (event) => {
    event.preventDefault();

    newComment(inputText);
    setCommentAdded(commentAdded + 1);
    addComment(commentAdded);
    setInputText('');
  }


  return (
    <form action="">
      <img src="" alt="user avatar" />
      <div className="comment-form">
        <input
          value={inputText}
          onChange={handleInputChange}
          className="comment-form__input"
          type="text"
        />
        <button
          onClick={handleSending}
          className="comment-form__button"
          type="submit"
        >
          send
        </button>
      </div>
      <div>_____________________________________</div>
    </form>
  )
}