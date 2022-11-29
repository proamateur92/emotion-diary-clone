// 현 시점 기준 날짜의 형태를 YYYY-MM-DD 형태로 가져오기 위한 함수
export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};
