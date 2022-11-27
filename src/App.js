// react
import { createContext } from "react";

// router
import { Routes, Route } from "react-router-dom";

// pages
import Main from "./pages/Main";
import DiaryWrite from "./pages/DiaryWrite";
import DiaryDetail from "./pages/DiaryDetail";
import DiaryEdit from "./pages/DiaryEdit";
import ErrorPage from "./pages/ErrorPage";

// components
import Header from "./components/Layout/Header";
import Button from "./components/Layout/Button";

// react
import { useReducer, useRef } from "react";

// context api
export const DiaryStateContext = createContext();

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
        it.id !== action.data.targetId ? it : { ...action.data }
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
  return newState;
};

const App = () => {
  // data는 useReducer의 두번째 인자를 받는다.
  const [diaryData, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  console.log(`dataId: ${dataId.current}`);

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
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/diary/1" element={<DiaryDetail onRemove={onRemove} />} />
        <Route path="/write" element={<DiaryWrite onCreate={onCreate} />} />
        <Route path="/edit" element={<DiaryEdit onEdit={onEdit} />} />
      </Routes>
    </DiaryStateContext.Provider>
  );
};

export default App;
