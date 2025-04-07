import { faStar } from "@fortawesome/free-regular-svg-icons/faStar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StarRating from "./StarRating";

const reviews = [
  {
    key: 1,
    fullname: "Phong",
    datePublication: "20-10-2025",
    stars: 2.5,
    comment: "Đây là test",
  },
];

const ReviewComment = () => {
  return (
    <div className="text-black">
      <div className="bg-blue-400">
        <div>
          <div>
            <div>
              <h1>Reviews & Comments PC Intel i3-12100F/VGA RX 6500XT (Powered by ASUS)</h1>
            </div>
          </div>
        </div>
        {/* Comment of customer */}
        <div className=" border-t-1 border-b-1 border-gray-400">
          <div>
            {reviews.map((item, key) => (
              <div key={key}>
                <div className="mb-4">
                  <span>{item.fullname}</span>
                  <span>{item.datePublication}</span>
                </div>
                <div className="flex mb-4">
                  <span>
                    <StarRating stars={item.stars} />
                  </span>
                  <span className="ml-24">{item.comment}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Btn send reviews */}
        <div className="mt-4">
          <div className="bg-blue-600 rounded-sm flex items-center justify-center">
            <button className="flex gap-3 py-1.5">
              <span>
                <FontAwesomeIcon icon={faStar} size="sm" style={{ color: "#ea2a2a" }} />
              </span>
              <span>Gửi đánh giá của bạn</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewComment;
