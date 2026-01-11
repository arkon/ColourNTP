import styled from 'styled-components';

const TabContent = styled.div`
  padding: 1em 0;
`;

interface TabProps {
    name: string;
    children?: React.ReactNode;
}

export function Tab({ children }: TabProps) {
    return <TabContent>{children}</TabContent>;
}
