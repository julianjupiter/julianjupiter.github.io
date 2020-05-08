import { MENUS } from "./config";

export function formatDate(date) {
  return `${date.toLocaleString("default", {
    month: "long",
  })} ${date.getDate()}, ${date.getFullYear()}`;
}

export function getMenus() {
  return MENUS;
}
