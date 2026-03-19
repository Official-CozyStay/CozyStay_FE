/**
 * spacing 값에서 숫자만 추출하는 유틸리티 함수
 * px, rem, em 등 다양한 단위를 지원
 * @param spacingValue - "64px", "4rem", "2em" 등의 spacing 값
 * @returns 숫자 값 (단위 제외)
 */
export const parseSpacingValue = (spacingValue: string): number => {
  // 숫자와 소수점만 추출
  const match = spacingValue.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};

/**
 * 여러 spacing 값을 더하는 유틸리티 함수
 * @param spacingValues - spacing 값들의 배열
 * @returns 모든 spacing 값의 합 (숫자)
 */
export const sumSpacingValues = (...spacingValues: string[]): number => {
  return spacingValues.reduce(
    (sum, value) => sum + parseSpacingValue(value),
    0,
  );
};
