import styled from 'styled-components';

import CloseIcon from '../../icons/close.svg?react';
import { theme } from '../../styles/theme';

const SidebarWrapper = styled.div<{ $open: boolean }>`
  background-color: ${theme.colors.darkGrey};
  height: 100%;
  left: 0;
  overflow-y: auto;
  padding: 2em;
  position: fixed;
  top: 0;
  transform: ${({ $open }) => ($open ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s cubic-bezier(0, 0, 0.3, 1);
  width: 20em;
  z-index: ${theme.zIndex.sidebar};
`;

const CloseButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  height: 1.5em;
  opacity: 0.5;
  position: absolute;
  right: 1em;
  top: 1em;
  transition: opacity 0.2s;
  width: 1.5em;

  &:hover {
    opacity: 1;
  }

  svg {
    fill: ${theme.colors.white};
    height: 100%;
    width: 100%;
  }
`;

interface SidebarProps {
    open: boolean;
    onClose: (e: React.MouseEvent) => void;
    children?: React.ReactNode;
}

export function Sidebar({ open, onClose, children }: SidebarProps) {
    return (
        <SidebarWrapper $open={open}>
            {open && (
                <div>
                    <CloseButton onClick={onClose}>
                        <CloseIcon />
                    </CloseButton>
                    {children}
                </div>
            )}
        </SidebarWrapper>
    );
}
