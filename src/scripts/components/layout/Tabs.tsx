import { useState, useEffect, type ReactElement } from 'react';
import styled, { css } from 'styled-components';

import { theme } from '../../styles/theme';

type TabVariant = 'panels' | 'options';

const TabsList = styled.ul<{ $variant: TabVariant }>`
  display: block;
  list-style: none;

  ${({ $variant }) =>
      $variant === 'panels'
          ? css`
                font-size: 0.9em;
                margin: 4em 0 1em;
            `
          : css`
                margin-top: 2em;
            `}
`;

const TabItemBase = styled.li<{ $variant: TabVariant }>`
  cursor: pointer;
  display: inline-block;

  ${({ $variant }) =>
      $variant === 'panels' &&
      css`
          & + &::before {
              content: '•';
              margin-right: 0.5em;
          }
      `};
`;

export const TabItem = styled(TabItemBase)<{ $active: boolean }>`
  color: inherit;
  contain: content;
  padding: 0.25em;

  span {
    opacity: ${({ $active }) => ($active ? 1 : 0.5)};
    transition: opacity 0.3s;
    will-change: opacity;
  }

  &:hover span {
    opacity: 1;
  }
`;

const OptionsTabItem = styled(TabItemBase)<{ $active: boolean }>`
  margin-right: 1px;
  padding: 0.5em 1em;

  ${({ $active }) =>
      $active &&
      css`
          background: ${theme.colors.grey};
          color: ${theme.colors.white};
      `}

  &:hover {
    background: ${theme.colors.grey};
    color: ${theme.colors.white};
  }
`;

interface TabsProps {
    activeTab: number | null;
    canToggle?: boolean;
    onToggle?: (tab: number | null) => void;
    variant?: TabVariant;
    children: ReactElement<{ name: string }>[] | ReactElement<{ name: string }>;
}

export function Tabs({ activeTab: initialTab, canToggle, onToggle, variant = 'options', children }: TabsProps) {
    const [activeTab, setActiveTab] = useState<number | null>(initialTab);

    useEffect(() => {
        if (initialTab !== activeTab) {
            setActiveTab(initialTab);
        }
    }, [initialTab]);

    const handleTab = (tab: number) => {
        let newTab: number | null = tab;

        if (canToggle) {
            newTab = activeTab === tab ? null : tab;
        }

        setActiveTab(newTab);
        onToggle?.(newTab);
    };

    const childArray = Array.isArray(children) ? children : [children];
    const validChildren = childArray.filter(Boolean);

    const Item = variant === 'panels' ? TabItem : OptionsTabItem;

    return (
        <>
            <TabsList $variant={variant}>
                {validChildren.map((tab, i) => (
                    <Item key={i} $active={activeTab === i} $variant={variant} onClick={() => handleTab(i)}>
                        {variant === 'panels' ? <span>{tab.props.name}</span> : tab.props.name}
                    </Item>
                ))}
            </TabsList>
            {activeTab !== null && validChildren[activeTab]}
        </>
    );
}
