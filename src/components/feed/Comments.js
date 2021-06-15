import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../shared";
import Comment from "./Comment";

const CommentsContainer = styled.div`
  margin-top: 20px;
`;
const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0;
  display: block;
  font-size: 12px;
  font-weight: 600;
`;
function Comments({ author, caption, commentCount, comments }) {
  return (
    <CommentsContainer>
      <Comment author={author} payload={caption}></Comment>
      {commentCount === 0 ? (
        <CommentCount>댓글 없음</CommentCount>
      ) : (
        <CommentCount>
          {commentCount === 1 ? "1 comment" : `${commentCount} comments`}
        </CommentCount>
      )}
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.user.username}
          payload={comment.payload}
        />
      ))}
    </CommentsContainer>
  );
}

Comments.propTypes = {
  author: PropTypes.string.isRequired,
  caption: PropTypes.string,
  commentCount: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string,
      }),
      payload: PropTypes.string.isRequired,
      isMine: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ),
};

export default Comments;
