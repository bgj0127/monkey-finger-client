import { atom } from "recoil";

export const initialData = atom({
  key: "initialData",
  default: {
    value: {},
  },
});

export const currentFilter = atom({
  key: "currentFilter",
  default: {
    language: "",
    mode: "",
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
