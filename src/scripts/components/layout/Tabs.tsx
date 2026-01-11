import { useState, useEffect, type ReactElement } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const TabsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25em;
  margin-top: 1em;
`;

const TabItem = styled.li<{ $active: boolean }>`
  border: 1px solid ${theme.colors.lightGrey};
  cursor: pointer;
  font-size: 0.85em;
  padding: 0.35em 0.75em;
  transition: background-color 0.2s, color 0.2s;

  ${({ $active }) =>
    $active &&
    `
    background-color: ${theme.colors.white};
    color: ${theme.colors.darkGrey};
  `}

  &:hover {
    background-color: ${theme.colors.white};
    color: ${theme.colors.darkGrey};
  }
`;

interface TabsProps {
  activeTab: number | null;
  canToggle?: boolean;
  onToggle?: (tab: number | null) => void;
  children: ReactElement<{ name: string }>[] | ReactElement<{ name: string }>;
}

export function Tabs({ activeTab: initialTab, canToggle, onToggle, children }: TabsProps) {
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

  return (
    <>
      <TabsList>
        {validChildren.map((tab, i) => (
          <TabItem key={i} $active={activeTab === i} onClick={() => handleTab(i)}>
            {tab.props.name}
          </TabItem>
        ))}
      </TabsList>
      {activeTab !== null && validChildren[activeTab]}
    </>
  );
}
