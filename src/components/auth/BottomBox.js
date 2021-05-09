import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../shared";

const Container = styled(BaseBox)`
  padding: 25px 0;
  margin-top: 10px;
  text-align: center;
  font-size: 15px;
  span {
    margin-right: 5px;
  }
  a {
    margin-left: 5px;
    font-weight: 600;
    color: ${(props) => props.theme.accent};
  }
`;

function BottomBox({ cta, link, linkText }) {
  return (
    <Container>
      <span>{cta}</span>
      <Link to={link}>{linkText}</Link>
    </Container>
  );
}

BottomBox.propTypes = {
  cta: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};

export default BottomBox;
