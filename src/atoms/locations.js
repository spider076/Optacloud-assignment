import { atom } from "recoil";

export const autoLocState = atom({
  key: "autoLocState",
  default: false
});

export const triggerLocationState = atom({
  key: "triggerLocationState",
  default: false
});

export const addressState = atom({
  key: "addressState",
  default: null
});

export const addressFormVisibleState = atom({
  key: "addressFormVisibleState",
  default: false // Initially hidden
});

export const authTokenState = atom({
  key: "authTokenState",
  default: null // Initially no token
});
