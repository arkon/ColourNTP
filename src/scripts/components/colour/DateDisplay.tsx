import styled from 'styled-components';

const DateText = styled.h2`
  animation: shiftUp 0.5s ease-out 0.1s forwards;
  contain: content;
  font-size: 1.5em;
  margin-top: 1.5rem;
  opacity: 0;

  @media (max-width: 700px) {
    font-size: 1em;
  }
`;

interface DateDisplayProps {
    date: string;
}

export function DateDisplay({ date }: DateDisplayProps) {
    return <DateText>{date}</DateText>;
}
