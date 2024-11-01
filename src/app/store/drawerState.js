import { atom } from 'recoil';

export const drawerState = atom({
  key: 'isOpenDrawer', // unique ID
  default: false,     // ค่าเริ่มต้น (ปิด drawer)
});

export const selectedMenuState = atom({
  key: 'selectedItem', // unique ID
  default: 'Home',       // ค่าเริ่มต้น (ยังไม่มี item ที่ถูก select)
});

export const activeSubMenuState = atom({
  key: 'activeSubMenu', // unique ID
  default: '',       // ค่าเริ่มต้น (ยังไม่มี item ที่ถูก select)
});

export const isDarkModeState = atom({
  key: 'isDarkMode', // unique ID
  default: false,       // ค่าเริ่มต้น (ยังไม่มี item ที่ถูก select)
});