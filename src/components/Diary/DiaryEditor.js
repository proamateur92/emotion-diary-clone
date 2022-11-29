// react
import { useContext, useEffect, useRef, useState } from "react";

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

// util
import { getStringDate } from "../../util/date";
import { emotionList } from "../../util/emotion";

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();

  const contentRef = useRef();

  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(originData.date)));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  // 감정을 선택하면 emotion state값 변환
  const handleClickEmote = (emotion_id) => {
    setEmotion(emotion_id);
  };

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const handleSubmit = () => {
    if (content.trim() === "") {
      contentRef.current.focus();
      return;
    }

    if (window.confirm(isEdit ? "일기를 수정할까요?" : "일기를 작성할까요?")) {
      isEdit
        ? onEdit(originData.id, date, content, emotion)
        : onCreate(date, content, emotion);
    }

    navigate("/", { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm("일기를 삭제할까요?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };
  return (
    <div className={classes.DiaryEditor}>
      <Header
        headerText={isEdit ? "일기 수정" : "새 일기 작성"}
        leftChild={
          <Button buttonText="< 뒤로가기" onClick={() => navigate(-1)} />
        }
        rightChild={
          isEdit && (
            <Button
              buttonText="삭제하기"
              type="negative"
              onClick={() => handleRemove()}
            />
          )
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
            buttonText={isEdit ? "수정하기" : "작성하기"}
            type="positive"
            onClick={handleSubmit}
          />
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
