import styled, { css } from 'styled-components';

import { theme } from '../../styles/theme';

type TabVariant = 'panels' | 'options';

const TabContent = styled.div<{ $variant: TabVariant }>`
  ${({ $variant }) =>
      $variant === 'options'
          ? css`
                background: ${theme.colors.grey};
                padding: 1em;
            `
          : css`
                padding: 1em 0;
            `}
`;

interface TabProps {
    name: string;
    variant?: TabVariant;
    children?: React.ReactNode;
}

export function Tab({ variant = 'options', children }: TabProps) {
    return <TabContent $variant={variant}>{children}</TabContent>;
}
