import { useState } from "react";
import iconList from "../../constants/icons";

const MyProfile = () => {
  const [icon, setIcon] = useState("🐵");

  // 아이콘 랜덤 선택
  const randomIcon = () => {
    setIcon(iconList[Math.floor(Math.random() * iconList.length)]);
  };

  return (
    <div>
      <div className="imgContainer">
        <div className="p-bold" onClick={randomIcon}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
