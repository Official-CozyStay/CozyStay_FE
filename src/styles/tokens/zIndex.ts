// Z-index 레이어 관리
export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
  searchBar: 999,
  header: 1000,
  // 모달과 사이드바는 header(1000)보다 위에 표시되어야 함
  modalOverlay: 1100,
  modalContainer: 1101,
  sidebarOverlay: 1100,
  sidebar: 1101,
};
