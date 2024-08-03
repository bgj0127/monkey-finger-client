import { atom, selector } from "recoil";

export const typingData = atom({
  key: "typingData",
  default: {
    value: {},
  },
});

export const typingAvg = selector({
  key:"typingAvg",
  get: ({get}) => {
    const data = get(typingData)
    if (data.wpm?.length) {
      const wpmAvg = Math.round((data.wpm.reduce((a,c) => a+c) / data.wpm.length) * 100) / 100 
      const accAvg = Math.round((data.acc.reduce((a,c) => a+c) / data.acc.length) * 100) / 100
      return {wpmAvg, accAvg}
    }
  }
})

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
