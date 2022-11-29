// react
import { useState } from "react";

// router
import { useNavigate } from "react-router-dom";

// components
import Button from "../Layout/Button";
import DairyItem from "./DiaryItem";

// css
import classes from "./DiaryList.module.css";

const ControlMenu = ({ value, optionList, onChange }) => {
  return (
    <select
      className={classes.ControlMenu}
      name={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it) => {
        return (
          <option key={it.value} value={it.value}>
            {it.name}
          </option>
        );
      })}
    </select>
  );
};

const sortOptions = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptions = [
  { value: "all", name: "모든 감정" },
  { value: "good", name: "좋은 감정" },
  { value: "bad", name: "안좋은 감정" },
];

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();

  const [sortName, setSortName] = useState("latest");
  const [filterName, setFilterName] = useState("all");

  // 감정 별 필터링 함수
  const filteredByEmotion = (list) => {
    let filteredList = list;

    if (filterName === "good") {
      filteredList = list.filter((it) => it.emotion <= 3);
    } else if (filterName === "bad") {
      filteredList = list.filter((it) => it.emotion >= 4);
    }

    return filteredList;
  };

  // 최신, 오랜 순으로 정렬 함수
  const orderedByTime = () => {
    // 원본 데이터가 아닌 사본 (깊은 복사)

    if (diaryList.length > 0) {
      const copyList = JSON.parse(JSON.stringify(diaryList));

      const compare = (a, b) => {
        if (sortName === "latest") {
          return b.date - a.date;
        } else {
          return a.date - b.date;
        }
      };

      return filteredByEmotion(copyList).sort(compare);
    } else {
      return diaryList;
    }
  };

  return (
    <div>
      <div className={classes.menu_wrapper}>
        <div className={classes.left_col}>
          <ControlMenu
            value={sortName}
            optionList={sortOptions}
            onChange={setSortName}
          />
          <ControlMenu
            value={filterName}
            optionList={filterOptions}
            onChange={setFilterName}
          />
        </div>
        <div className={classes.right_col}>
          <Button
            buttonText="새 일기 작성하기"
            type="positive"
            onClick={() => navigate("/write")}
          />
        </div>
      </div>
      {orderedByTime().length === 0 && (
        <div className={classes.no_diary}>등록된 일기가 없습니다.</div>
      )}
      {diaryList.length > 0 &&
        orderedByTime().map((it) => <DairyItem key={it.id} {...it} />)}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
