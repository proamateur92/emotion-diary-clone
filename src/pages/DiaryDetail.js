// react
import { useState, useEffect, useContext } from "react";

// router
import { useNavigate, useParams } from "react-router-dom";

// context api
import { DiaryStateContext } from "../App";

// components
import Header from "../components/Layout/Header";
import Button from "../components/Layout/Button";

// util
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

// css
import classes from "./DiaryDetail.module.css";

const DiaryDetail = () => {
  const navigate = useNavigate();
  const { diaryId } = useParams();
  const diaryList = useContext(DiaryStateContext);

  // 일기 상태 관리
  const [diaryData, setDairyData] = useState(null);

  // 감정 상태 관리
  const [curEmotion, setCurEmotion] = useState(null);

  useEffect(() => {
    if (diaryList.length > 0) {
      const targetDairy = diaryList.find(
        (it) => parseInt(it.id) === parseInt(diaryId)
      );

      if (targetDairy) {
        setDairyData(targetDairy);

        const targetEmotion = emotionList.find(
          (it) => parseInt(it.emotion_id) === parseInt(targetDairy.emotion)
        );
        setCurEmotion(targetEmotion);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [navigate, diaryId, diaryList]);

  return (
    <div className={classes.DiaryDetail}>
      {!diaryData && <span>일기 불러오는 중...</span>}
      {diaryData && (
        <div>
          <Header
            headerText={`${getStringDate(new Date(diaryData.date))} 기록`}
            leftChild={
              <Button buttonText="< 뒤로가기" onClick={() => navigate(-1)} />
            }
            rightChild={
              <Button
                buttonText="수정하기"
                type="positive"
                onClick={() => navigate(`/edit/${diaryData.id}`)}
              />
            }
          />
          <article>
            <section>
              <h4>오늘의 감정</h4>
              <div
                className={
                  classes[`emotion_img_wrapper_${curEmotion.emotion_id}`]
                }
              >
                <img
                  src={curEmotion.emotion_src}
                  alt={`${curEmotion.emotion_id}번 감정 이미지`}
                />
                <span>{curEmotion.emotion_descript}</span>
              </div>
            </section>
            <section>
              <h4>오늘의 일기</h4>
              <div className={classes.content_wrapper}>{diaryData.content}</div>
            </section>
          </article>
        </div>
      )}
    </div>
  );
};

export default DiaryDetail;
