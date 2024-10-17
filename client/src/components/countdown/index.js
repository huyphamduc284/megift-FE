import React from "react";
import Countdown from "react-countdown";
import "./index.css";
class Offer extends React.Component {
  render() {
    // Hàm render tùy chỉnh để hiển thị đếm ngược
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        // Hiển thị khi đếm ngược kết thúc
        return <span>Khuyến mãi đã kết thúc!</span>;
      } else {
        // Hiển thị đếm ngược với giao diện tùy chỉnh
        return (
          <div className="countdown-timer">
            <div className="countdown-box">
              <span>{days.toString().padStart(2, "0")}</span> <br />
              <small>Ngày</small>
            </div>
            <span className="separator">:</span>
            <div className="countdown-box">
              <span>{hours.toString().padStart(2, "0")}</span> <br />
              <small>Giờ</small>
            </div>
            <span className="separator">:</span>
            <div className="countdown-box">
              <span>{minutes.toString().padStart(2, "0")}</span> <br />
              <small>Phút</small>
            </div>
            <span className="separator">:</span>
            <div className="countdown-box">
              <span>{seconds.toString().padStart(2, "0")}</span> <br />
              <small>Giây</small>
            </div>
          </div>
        );
      }
    };

    return (
      <div className="offer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="countdownwrap">
                <Countdown date={new Date("2024-11-22")} renderer={renderer} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Offer;
