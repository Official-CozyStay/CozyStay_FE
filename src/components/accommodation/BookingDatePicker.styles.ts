import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
`;

export const TriggerButton = styled.button`
  width: 100%;
  text-align: left;
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 12px 14px;
  background: ${({ theme }) => theme.colors.common.white};
  cursor: pointer;
`;

export const TriggerLabel = styled.div`
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const TriggerValue = styled.div`
  font-weight: 600;
  font-size: ${({ theme }) => theme.font.size.md};
`;

export const PopoverContainer = styled.div`
  position: absolute;
  z-index: 99999;
  background: ${({ theme }) => theme.colors.common.white};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  padding: 8px;
  min-width: 660px;
`;

export const dayPickerStyles = {
    months: { display: "flex", flexWrap: "nowrap" },
    month: { width: 320, margin: "0 8px" },
} as const;
