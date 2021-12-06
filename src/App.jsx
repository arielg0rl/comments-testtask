import './App.css';
import React, { useState, useEffect } from 'react';
import { NewCommentInput } from './components/NewComponentInput';
import { CommentsList } from './components/CommentsList';
import { getComments } from './api';
import './App.css';

function App() {
  const [comments, setComments] = useState([]);
  const [isCommentAdded, setIsCommentAdded] = useState();

  const updateComments = (isAddedStatus) => {
    getComments().then(loadedComments => setComments(loadedComments));

    if (isAddedStatus !== isCommentAdded) {
      setIsCommentAdded(isAddedStatus);
    }
  }
 
  useEffect(() => {
    getComments().then(loadedComments => setComments(loadedComments))
  }, [isCommentAdded]);

  return (
    <div className="App">
      <div className="App__container">
        <NewCommentInput addComment={updateComments} />
        {
          comments && <CommentsList comments={comments}/>
        }
      </div>
    </div>
  );
}

export default App;
