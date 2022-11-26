// router
import { Link } from "react-router-dom";

// components
import Button from "../components/Layout/Button";

const Main = () => {
  return (
    <div>
      <h1>메인페이지</h1>
      <Link to="/">메인</Link>
      <Link to="/write">일기 쓰기</Link>
      <Link to="/edit">일기 수정</Link>
      <Link to="/diary/1">일기 상세 페이지</Link>
      <Button
        buttonText="그냥 버튼"
        type="default"
        onClick={() => console.log("그냥")}
      />
      <Button
        buttonText="부정 버튼"
        type="negative"
        onClick={() => console.log("부정")}
      />
      <Button
        buttonText="긍정 버튼"
        type="positive"
        onClick={() => console.log("긍정")}
      />
      <Button
        buttonText="무작위 버튼"
        type="asasa"
        onClick={() => console.log("긍정")}
      />
    </div>
  );
};

export default Main;
