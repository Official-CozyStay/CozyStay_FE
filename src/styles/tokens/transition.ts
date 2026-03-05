// Transition 애니메이션
export const transition = {
  fast: '0.15s ease',
  normal: '0.2s ease',
  slow: '0.3s ease',
  all: {
    fast: 'all 0.15s ease',
    normal: 'all 0.2s ease',
    slow: 'all 0.3s ease',
  },
  transform: {
    fast: 'transform 0.15s ease',
    normal: 'transform 0.2s ease',
    slow: 'transform 0.3s ease',
  },
  colors: {
    fast: 'color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease',
    normal:
      'color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',
    slow: 'color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease',
  },
  // 추가 transform 값들
  translateY: {
    sm: 'translateY(-2px)',
  },
};
