// react
import { useContext, useRef, useState } from "react";

// router
import { useNavigate } from "react-router-dom";

// components
import Header from "../Layout/Header";
import Button from "../Layout/Button";

// context api
import { DiaryDispatchContext } from "../../App";

// css
import classes from "./DiaryEditor.module.css";
import EmotionItem from "./EmotionItem";

// 현 시점 기준 날짜의 형태를 YYYY-MM-DD 형태로 가져오기 위한 함수
const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

// 감정을 나열하기 위한 배열
const emotionList = [
  {
    emotion_id: 1,
    emotion_src: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_src: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_src: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: "보통",
  },
  {
    emotion_id: 4,
    emotion_src: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_src: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: "최악",
  },
];

const DiaryEditor = () => {
  const navigate = useNavigate();

  const contentRef = useRef();

  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("");

  const handleClickEmote = (emotion_id) => {
    setEmotion(emotion_id);
  };

  const { onCreate } = useContext(DiaryDispatchContext);

  const handleSubmit = () => {
    if (content.trim() === "") {
      contentRef.current.focus();
      return;
    }

    onCreate(new Date(date).getTime(), content, emotion);

    navigate("/", { replace: true });
  };

  return (
    <div className={classes.DiaryEditor}>
      <Header
        headerText="새 일기 작성"
        leftChild={
          <Button buttonText="< 뒤로가기" onClick={() => navigate(-1)} />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className={classes.input_box}>
            <input
              className={classes.input_date}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정은요?</h4>
          <div className={classes.emotion_list_wrapper}>
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                isSelected={it.emotion_id === emotion}
                onClick={handleClickEmote}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className={classes.content_wrapper}>
            <textarea
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="오늘 하루는 어땠나요?"
            />
          </div>
        </section>
        <section className={classes.button_wrapper}>
          <Button buttonText={"취소하기"} onClick={() => navigate(-1)} />
          <Button
            buttonText={"작성완료"}
            type="positive"
            onClick={handleSubmit}
          />
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
