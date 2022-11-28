// css
import classes from "./EmotionItem.module.css";

const EmotionItem = ({
  emotion_id,
  emotion_src,
  emotion_descript,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={
        isSelected ? classes[`EmotionItem_${emotion_id}`] : classes.EmotionItem
      }
      onClick={() => onClick(emotion_id)}
    >
      <img src={emotion_src} alt={`감정이미지 ${emotion_id}`} />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default EmotionItem;
