// react
import { useContext, useEffect, useState } from "react";

// context api
import { DiaryStateContext } from "../App";

// components
import Button from "../components/Layout/Button";
import Header from "../components/Layout/Header";
import DiaryList from "../components/Diary/DiaryList";

const Main = () => {
  // 기준 날짜를 저장할 state
  const [curDate, setCurDate] = useState(new Date());

  const headerText = `
  ${curDate.getFullYear()}년 
  ${curDate.getMonth() + 1}월`;

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  // 전역으로 관리되는 일기 데이터
  const diaryList = useContext(DiaryStateContext);

  // 기준 날짜 필터링되는 일기 데이터 state
  const [diary, setDiary] = useState([]);

  useEffect(() => {
    // 일기 데이터가 존재하는 경우에만 필터링
    if (diaryList.length > 0) {
      // 기준 월의 첫째 날
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      // 기준 월의 마지막 날
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        1
      ).getTime();

      setDiary(
        diaryList.filter((it) => it.date >= firstDay && it.date < lastDay)
      );
    }
  }, [diaryList, curDate]);

  return (
    <div>
      <Header
        headerText={headerText}
        leftChild={<Button buttonText="<" onClick={() => decreaseMonth()} />}
        rightChild={<Button buttonText=">" onClick={() => increaseMonth()} />}
      />
      <DiaryList diaryList={diary} />
    </div>
  );
};

export default Main;
