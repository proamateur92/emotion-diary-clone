// react
import { createContext, useEffect } from "react";

// router
import { Routes, Route } from "react-router-dom";

// pages
import Main from "./pages/Main";
import DiaryWrite from "./pages/DiaryWrite";
import DiaryDetail from "./pages/DiaryDetail";
import DiaryEdit from "./pages/DiaryEdit";
// import ErrorPage from "./pages/ErrorPage";

// react
import { useReducer, useRef } from "react";

// context api
export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

// reducer 함수
const reducer = (state, action) => {
  let newState = [];

  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id !== action.data.id ? it : { ...action.data }
      );
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    default: {
      return state;
    }
  }

  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

const App = () => {
  useEffect(() => {
    const localData = localStorage.getItem("diary");

    if (localData) {
      const diaryList = JSON.parse(localData);
      dataId.current = diaryList.length + 1;

      dispatch({ type: "INIT", data: diaryList });
    }
  }, []);

  // data는 useReducer의 두번째 인자를 받는다.
  const [diaryData, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });

    dataId.current++;
  };

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  return (
    <DiaryStateContext.Provider value={diaryData}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/diary/:diaryId" element={<DiaryDetail />} />
          <Route path="/write" element={<DiaryWrite />} />
          <Route path="/edit/:diaryId" element={<DiaryEdit />} />
        </Routes>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export default App;
