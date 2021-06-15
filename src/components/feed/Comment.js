import styled from "styled-components";
import { FatText } from "../shared";
import PropTypes from "prop-types";
import sanitizeHtml from "sanitize-html";
const CommentContainer = styled.div``;
const CommentCaption = styled.span`
  margin-left: 10px;
  mark {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Comment({ author, payload }) {
  // sanitizeHtml은 허락한 tag가 아닌 tag는 지워버린다.
  const cleanedPayload = sanitizeHtml(
    payload.replace(/#[^#]+/g, "<mark>$&</mark>"),
    {
      allowedTags: ["mark"],
    }
  );

  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption
        // 기본적으로 브라우저는 user를 신뢰하지 않아서 tag로 인식하지않고 그냥 문자열로 인식한다.
        // 이를 HTML 태그로 인식하도록 해준다.
        dangerouslySetInnerHTML={{
          __html: cleanedPayload,
        }}
      />
    </CommentContainer>
  );
}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};

export default Comment;
