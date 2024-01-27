import React from 'react';

const CommentSingleMessage = (props) => {
    const {comment} = props
  return (
    <>

      <div className='comment-sgl-msg'>
        <div style={{"fontWeight":"bold"}}>
            {comment.username}
            <span style={{float:"right" ,color:"#a6a6a6bf"}}>
                {comment.time}
            </span>
        </div>
            {comment.comment}
      </div>
    </>
  );
}

export default CommentSingleMessage;
