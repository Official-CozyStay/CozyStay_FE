import styled from 'styled-components';

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 240px;
  background: ${({ theme }) => theme.colors.common.white};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  overflow: hidden;
  z-index: 1000;
  max-height: calc(100vh - 80px); /* 헤더 높이 등을 고려한 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤 허용 */

  /* 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

export const DropdownSection = styled.div`
  padding: 8px 0;
`;

export const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.font.size.md};
  cursor: pointer;
  transition: background 0.15s ease;
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.colors.background.default};
  }

  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
`;

export const DropdownDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border.light};
  margin: 4px 0;
`;

export const DropdownHeader = styled.div`
  padding: 16px;
  display: flex;
  gap: 12px;
`;

export const DropdownHeaderImage = styled.div`
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.primary.light};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 28px;
    height: 28px;
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const DropdownHeaderTitle = styled.div`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin-bottom: 4px;
`;

export const DropdownHeaderDesc = styled.div`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.4;
`;

