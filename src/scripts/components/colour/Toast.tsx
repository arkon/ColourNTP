import styled from 'styled-components';
import { theme } from '../../styles/theme';

const ToastWrapper = styled.div`
  animation: shiftUp 0.3s ease-out forwards;
  background-color: ${theme.colors.white};
  border-radius: 3px;
  bottom: 2em;
  color: ${theme.colors.darkGrey};
  font-size: 0.85em;
  left: 50%;
  padding: 0.75em 1.5em;
  position: fixed;
  transform: translateX(-50%);
  z-index: ${theme.zIndex.top};
`;

interface ToastProps {
  visible: boolean;
  children?: React.ReactNode;
}

export function Toast({ visible, children }: ToastProps) {
  if (!visible) return null;
  return <ToastWrapper>{children}</ToastWrapper>;
}
