// react
import { useContext, useEffect, useState } from "react";

// router
import { useParams, useNavigate } from "react-router-dom";

// context api
import { DiaryStateContext } from "../App";

// components
import DiaryEditor from "../components/Diary/DiaryEditor";

const DiaryEdit = () => {
  const navigate = useNavigate();
  const { diaryId } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const [originData, setOriginData] = useState(null);

  useEffect(() => {
    if (diaryList.length > 0) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(diaryId)
      );

      if (!targetDiary) {
        navigate("/", { replace: true });
      } else {
        setOriginData(targetDiary);
      }
    }
  }, [navigate, diaryId, diaryList]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default DiaryEdit;
