import { useState, useEffect } from 'react';
import styled from 'styled-components';

import CloseIcon from '../../icons/close.svg?react';
import { theme } from '../../styles/theme';

const ClearButton = styled.button`
  background: none;
  border: 1px solid ${theme.colors.white};
  color: ${theme.colors.white};
  cursor: pointer;
  font-family: inherit;
  font-size: 0.85em;
  margin: 0.5em 0;
  padding: 0.5em;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  td {
    border-bottom: 1px solid rgba(107, 107, 107, 0.5);
    border-top: 1px solid rgba(107, 107, 107, 0.5);
    padding: 0.5em 0;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  height: 1em;
  opacity: 0.5;
  transition: opacity 0.3s;
  width: 1em;

  &:hover {
    opacity: 1;
  }

  svg {
    fill: ${theme.colors.white};
  }
`;

interface DeleteListProps {
    data: Record<string, number>;
    onDelete: (url: string) => void;
    onDeleteAll: () => void;
}

interface SortedItem {
    date: number;
    url: string;
}

export function DeleteList({ data, onDelete, onDeleteAll }: DeleteListProps) {
    const [sortedList, setSortedList] = useState<SortedItem[]>([]);

    useEffect(() => {
        const list = Object.keys(data || {}).map((key) => ({
            date: data[key],
            url: key,
        }));
        setSortedList(list.sort((a, b) => b.date - a.date));
    }, [data]);

    return (
        <>
            <ClearButton onClick={onDeleteAll}>Clear list</ClearButton>
            <Table>
                <tbody>
                    {sortedList.map((item, i) => (
                        <tr key={i}>
                            <td>{item.url}</td>
                            <td>
                                <RemoveButton onClick={() => onDelete(item.url)}>
                                    <CloseIcon />
                                </RemoveButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
