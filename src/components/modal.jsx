import React from "react";
import sponsor from '../assets/images/sponsor.png'

export default function Modal(props) {
  const { hideModal } = props;
  return (
    <div onClick={hideModal} className="modal-container">
      <div
        className="disclaimer-modal m-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="disclaimer-modal-content p-2">
          <div onClick={hideModal} className="close-button"></div>
          <h2>Thông báo</h2>
          <p>
            Tất cả nội dung trong ứng dụng này nhằm mục đích giải trí, không dùng cho mục đích lừa đảo hay mưu cầu 
            chiếm lợi, lừa đảo nào.
          </p>
          
          <p>
            Ứng dụng này được lấy từ nguồn {" "}
            <a
              href="https://github.com/uzair-ashraf/genshin-impact-wish-simulator"
              target="_blank"
            >
              Ấn vào đây để truy cập
            </a>
            , Hãy tặng 1 đánh giá cho tác giả nếu bạn thích nó!
          </p>
          <p>
          Tất cả tên sản phẩm, logo và nhãn hiệu đều là trích từ game Genshin impact thuộc Mihoyo sở hữu bản quyền.
          </p>
          {/* <p>
            Sponsored By:
          </p>
          <a href="https://chrome.google.com/webstore/detail/coupon-cat/ndpmdcidjakfglhdplgnkncjhcfdoglm" target="_blank">
            <img
              height="40"
              className="my-2"
              style={{ border: "0px", height: "40px" }}
              src={sponsor}
              border="0"
              alt="Coupon Cat"
            />
          </a> */}
        </div>
      </div>
    </div>
  );
}
