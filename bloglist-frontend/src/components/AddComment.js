import React from 'react'

const AddComment = ({ handleCommentSubmit, comment, handleCommentChange }) => {
  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <input name="comment" id="comment"
          value={comment} onChange={handleCommentChange} />
        <button type="submit" id="submitComment">Add Comment</button>
      </form>
    </div>
  )
}

export default AddComment