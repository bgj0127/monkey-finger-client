import { atom } from "recoil";

export const typingData = atom({
  key: "typingData",
  default: {
    value: {},
  },
});

export const mouseXY = atom({
  key: "mouseXY",
  default: {
    x: -1000,
    y: -1000,
  },
});

export const isHover = atom({
  key: "isHover",
  default: {
    hover: false,
  },
});

export const pointData = atom({
  key: "pointData",
  default: {
    wpm: "",
    acc: "",
    mode: "",
    mode2: "",
    language: "",
    date: "",
  },
});
