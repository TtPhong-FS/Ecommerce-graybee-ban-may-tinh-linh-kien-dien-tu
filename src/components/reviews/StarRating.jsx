import { Rate } from "antd";
import PropTypes from "prop-types";

const StarRating = ({ stars }) => {
  return <Rate style={{ fontSize: "0.85rem" }} disabled allowHalf defaultValue={stars} />;
};

StarRating.propTypes = {
  stars: PropTypes.number,
};

export default StarRating;
