// router
import { useNavigate } from "react-router-dom";

// components
import Button from "../Layout/Button";

// css
import classes from "./DiaryItem.module.css";

const DairyItem = ({ id, date, content, emotion }) => {
  const naviagte = useNavigate();

  // date 객체 날짜 변환
  const strDate = new Date(date).toLocaleDateString();

  const moveDetailPage = () => {
    naviagte(`/diary/${id}`);
  };

  const moveEditPage = () => {
    naviagte(`/edit/${id}`);
  };

  return (
    <div className={classes.DiaryItem}>
      <div
        className={classes[`emotion_img_wrapper_${emotion}`]}
        onClick={moveDetailPage}
      >
        <img
          src={process.env.PUBLIC_URL + `/assets/emotion${emotion}.png`}
          alt="감정 이미지"
        />
      </div>
      <div className={classes.info_wrapper} onClick={moveDetailPage}>
        <span>{strDate}</span>
        <span>
          {content.slice(0, 25)}
          {content.length > 26 && "..."}
        </span>
      </div>
      <div className={classes.btn_wrpper}>
        <Button buttonText={"수정하기"} onClick={moveEditPage} />
      </div>
    </div>
  );
};

export default DairyItem;
