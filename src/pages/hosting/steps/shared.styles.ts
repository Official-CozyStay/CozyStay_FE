import styled, { css } from 'styled-components';
import { media } from '@/styles/media';

/**
 * 호스팅 등록 스텝 공통 스타일
 * - 모든 스텝에서 재사용되는 컴포넌트들
 */

// ============================================
// 컨테이너
// ============================================

/** 스텝 기본 컨테이너 (max-width: 640px) */
export const StepContainer = styled.div`
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['4xl']};
`;

/** 인트로 페이지용 컨테이너 (max-width: 1000px, 좌우 분할) */
export const IntroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1000px;
  gap: ${({ theme }) => theme.spacing['6xl']};

  ${media.tablet} {
    flex-direction: column;
    text-align: left;
    gap: ${({ theme }) => theme.spacing['4xl']};
  }
`;

// ============================================
// 타이틀 섹션
// ============================================

/** 타이틀 + 서브타이틀 래퍼 */
export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

/** 메인 타이틀 (h1, 32px) */
export const StepTitle = styled.h1`
  font-size: 32px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.text.primary};

  ${media.mobile} {
    font-size: 26px;
  }
`;

/** 큰 타이틀 (h2, xxl) - 선택 화면용 */
export const StepTitleLarge = styled.h2`
  font-size: ${({ theme }) => theme.font.size["2xl"]};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};

  ${media.mobile} {
    font-size: ${({ theme }) => theme.font.size.xl};
  }
`;

/** 인트로용 초대형 타이틀 (48px) */
export const IntroTitle = styled.h1`
  font-size: 48px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  line-height: 1.1;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  ${media.mobile} {
    font-size: 32px;
  }
`;

/** 서브타이틀/설명 텍스트 */
export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.font.size.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;
  word-break: keep-all;
  margin: 0;
`;

/** 단계 라벨 (1단계, 2단계 등) */
export const StepLabel = styled.span`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: block;
`;

/** 섹션 타이틀 (카테고리 내 소제목) */
export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

// ============================================
// 선택 가능한 그리드/카드
// ============================================

/** 3열 그리드 (모바일: 2열) */
export const SelectableGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

/** 선택 가능한 카드 기본 스타일 */
const selectableCardBase = css<{ $selected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid
    ${({ theme, $selected }) =>
      $selected ? theme.colors.text.primary : theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radius.lg};
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.background.hover : theme.colors.common.white};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};
  text-align: left;

  &:hover {
    border-color: ${({ theme }) => theme.colors.text.primary};
  }
`;

/** 선택 가능한 카드 (아이콘 + 라벨) */
export const SelectableCard = styled.button<{ $selected?: boolean }>`
  ${selectableCardBase}
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: 100px;
  justify-content: space-between;
`;

/** 선택 가능한 카드 - 컴팩트 버전 */
export const SelectableCardCompact = styled.button<{ $selected?: boolean }>`
  ${selectableCardBase}
  gap: ${({ theme }) => theme.spacing.sm};
`;

/** 카드 내 아이콘 래퍼 */
export const CardIcon = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

/** 카드 내 라벨 */
export const CardLabel = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

// ============================================
// 카운터 컨트롤
// ============================================

/** 카운터 리스트 컨테이너 */
export const CounterList = styled.div`
  display: flex;
  flex-direction: column;
`;

/** 카운터 아이템 행 */
export const CounterItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  &:last-child {
    border-bottom: none;
  }
`;

/** 카운터 텍스트 섹션 */
export const CounterTextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
`;

/** 카운터 라벨 */
export const CounterLabel = styled.span`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

/** 카운터 설명 */
export const CounterDescription = styled.p`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

/** 카운터 컨트롤 래퍼 */
export const CounterControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-left: ${({ theme }) => theme.spacing.xl};
`;

/** +/- 버튼 */
export const CounterButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  background-color: ${({ theme }) => theme.colors.common.white};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.normal};
  color: ${({ theme }) => theme.colors.text.secondary};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.main};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

/** 카운터 값 */
export const CounterValue = styled.span`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  min-width: 20px;
  text-align: center;
`;

// ============================================
// 인트로 페이지 전용
// ============================================

/** 인트로 텍스트 섹션 */
export const IntroTextSection = styled.div`
  flex: 1;
`;

/** 인트로 이미지 섹션 */
export const IntroImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

/** 인트로 일러스트 이미지 */
export const IntroIllustration = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
`;

/** 인트로 설명 텍스트 */
export const IntroDescription = styled.p`
  font-size: ${({ theme }) => theme.font.size.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.5;
  word-break: keep-all;
`;

// ============================================
// 기타 유틸리티
// ============================================

/** 섹션 래퍼 */
export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

/** 푸터 텍스트 */
export const FooterText = styled.p`
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

// ============================================
// 옵션 선택 카드 (라디오/체크박스 스타일)
// ============================================

/** 옵션 리스트 컨테이너 */
export const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

/** 옵션 카드 기본 스타일 */
export const OptionCard = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  border: ${({ theme, $selected }) =>
    $selected
      ? `2px solid ${theme.colors.text.primary}`
      : `1px solid ${theme.colors.border.primary}`};
  border-radius: ${({ theme }) => theme.radius.lg};
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.background.hover : theme.colors.common.white};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.text.primary};
  }
`;

/** 옵션 카드 내용 래퍼 */
export const OptionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
`;

/** 옵션 타이틀 */
export const OptionTitle = styled.span`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

/** 옵션 설명 */
export const OptionDescription = styled.p`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;
  margin: 0;
`;

/** 라디오 버튼 */
export const RadioButton = styled.div<{ $selected?: boolean }>`
  width: 24px;
  height: 24px;
  min-width: 24px;
  border-radius: 50%;
  border: 2px solid
    ${({ theme, $selected }) =>
      $selected ? theme.colors.text.primary : theme.colors.border.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  transition: all ${({ theme }) => theme.transition.fast};

  &::after {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${({ theme, $selected }) =>
      $selected ? theme.colors.text.primary : 'transparent'};
    transition: all ${({ theme }) => theme.transition.fast};
  }
`;

/** 숨겨진 라디오/체크박스 인풋 */
export const HiddenInput = styled.input`
  display: none;
`;

/** 아이콘 래퍼 */
export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

// ============================================
// 텍스트 입력 (TextArea, CharCount)
// ============================================

/** 텍스트 영역 기본 스타일 */
export const TextAreaBase = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  font-family: inherit;
  resize: none;
  transition: all ${({ theme }) => theme.transition.fast};

  &:focus {
    outline: none;
    border-width: 2px;
    padding: calc(${({ theme }) => theme.spacing.lg} - 1px);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

/** 글자 수 카운터 */
export const CharCount = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  align-self: flex-start;
`;
