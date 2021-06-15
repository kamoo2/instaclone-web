import PropTypes from "prop-types";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import Avatar from "../Avatar";
import { faHeart as FullHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { FatText } from "../shared";
import { gql, useMutation } from "@apollo/client";
import Comments from "./Comments";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  margin-bottom: 20px;
`;

const PhotoHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
`;

const Username = styled(FatText)`
  margin-left: 10px;
`;

const PhotoFile = styled.img`
  max-width: 100%;
`;

const PhotoData = styled.div`
  padding: 15px;
`;
const PhotoActions = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  // 기본적으로 icon들은 모두 svg이기 때문에 size조절을 font-size로 해줄수있다.
  svg {
    font-size: 20px;
  }
`;
const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;
const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

function Photo({
  id,
  user,
  caption,
  file,
  isLiked,
  likeCount,
  commentCount,
  comments,
}) {
  // writeFragment : cache에서 내가 원하는 특정 object의 일부분을 수정하는것
  const updateToggleLike = (cache, result) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      const fragmentId = `Photo:${id}`;
      const fragment = gql`
        fragment BSName on Photo {
          isLiked
          likeCount
        }
      `;
      const result = cache.readFragment({
        id: fragmentId,
        fragment,
      });
      // 현재 클릭된 Photo의 isLiked와 likeCount를 가져오는데 이는 Backend에서 가져온 것이아니고 cache에서 가져온 것이다.
      if ("isLiked" in result && "likeCount" in result) {
        const { isLiked, likeCount } = result;
        cache.writeFragment({
          id: fragmentId,
          // fragment : 데이터의 일부분 , 작은 크기의 데이터 , type전체가 아니고 Photo전체가 아니고 일부분
          fragment,
          data: {
            isLiked: !isLiked,
            likeCount: isLiked ? likeCount - 1 : likeCount + 1,
          },
        });
      }
    }
  };
  // 백엔드에서 query를 fetch하고 변한내용이 있다면 apollo가 cache를 update할 것임
  // refetchQueries를 사용할 수도있지만 이방법은 모든 query를 다시 refetch한다.
  // query크기가 크면 클수록 매우 비효율 적이다.
  // 그래서 사용할 두번째 방법은 fragments를 이용하는 것이다.
  // cache를 직접 update해주도록 하자
  const [toggleLikeMutation, { loading }] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    //backend에서 받은 데이터를 주는 function이고 apollo cache에 직접 link 한다.
    update: updateToggleLike,
  });
  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Avatar lg={true} url={user.avatar} />
        <Username>{user.username}</Username>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={toggleLikeMutation}>
              <FontAwesomeIcon
                style={{ color: isLiked ? "tomato" : "inherit" }}
                icon={isLiked ? FullHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PhotoActions>
        {likeCount !== 0 ? (
          <Likes>{likeCount === 1 ? "1 Like" : `${likeCount} Likes`}</Likes>
        ) : null}
        <Comments
          author={user.username}
          caption={caption}
          commentCount={commentCount}
          comments={comments}
        />
      </PhotoData>
    </PhotoContainer>
  );
}

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  file: PropTypes.string.isRequired,
  caption: PropTypes.string,
  isLiked: PropTypes.bool.isRequired,
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
};

export default Photo;
