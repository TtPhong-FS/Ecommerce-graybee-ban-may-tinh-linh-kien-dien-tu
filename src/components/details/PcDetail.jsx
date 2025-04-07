import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image } from "antd";
import ReviewComment from "../reviews/ReviewComment";

const PcDetail = () => {
  return (
    <div className="text-black">
      <div>
        <div className="flex gap-2">
          <a href="*">
            <span>
              <FontAwesomeIcon icon={faHouse} size="sm" style={{ color: "#206ef3" }} />
            </span>
            <span className="text-blue-600 font-medium">Trang chủ</span>
          </a>
          <span className="text-gray-500">/</span>
          <a href="*">
            <span className="text-blue-600 font-medium">PC</span>
          </a>
          <span className="text-gray-500">/</span>
          <span className="text-gray-500 font-medium">
            PC Intel i3-12100F/VGA RX 6500XT (Powered by ASUS)
          </span>
        </div>
        <div>
          <div>
            {/* Image product */}
            <div>
              <Image
                width={200}
                src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?`}
              />
            </div>
            {/* Thong tin chung */}
            <div>
              <div>
                {/* Ten, gia, danh gia */}
                <div>
                  {/* Ten */}
                  <div>
                    <h1>PC Intel i3-12100F/VGA RX 6500XT (Powered by ASUS)</h1>
                    <span>
                      <span>5.0</span>
                      <span>
                        <FontAwesomeIcon icon={faStar} size="sm" style={{ color: "#ea2a2a" }} />
                      </span>
                    </span>
                    <div>
                      <span>
                        9.990.000 <sup>đ&#817;</sup>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ReviewComment />
      </div>
    </div>
  );
};

export default PcDetail;
