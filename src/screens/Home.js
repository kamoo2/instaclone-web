import { useQuery, useReactiveVar } from "@apollo/client";
import gql from "graphql-tag";
import { isLoggedInVar } from "../apollo";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      user {
        username
        avatar
      }
      id
      file
      caption
      hashtags {
        hashtag
      }
      comments {
        id
        user {
          username
          avatar
        }
        payload
        isMine
        createdAt
      }
      commentCount
      likeCount
      createdAt
      isMine
      isLiked
    }
  }
`;

const Home = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery(FEED_QUERY, {
    skip: !hasToken,
  });
  console.log(data);
  return (
    <div>
      <PageTitle title="Home" />
      {data?.seeFeed?.map((photo) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
};

export default Home;
