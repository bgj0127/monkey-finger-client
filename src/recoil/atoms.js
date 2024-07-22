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
