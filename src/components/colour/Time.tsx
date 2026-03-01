import styled from 'styled-components';

import { pad } from '../../modules/timehelper';

const TimeWrapper = styled.h1`
    animation: shiftUp 0.5s ease-out forwards;
    contain: content;
    font-size: 7em;
    margin-bottom: 1.5rem;
    opacity: 0;
    position: relative;

    span {
        display: inline-block;
    }

    @media (max-width: 700px) {
        font-size: 4em;
    }

    @media (max-width: 600px) {
        font-size: 3em;
    }
`;

const Colon = styled.span<{ $flash: boolean }>`
  margin: 0 0.25em;
  opacity: ${({ $flash }) => ($flash ? 0 : 1)};
`;

const PostFix = styled.span`
    bottom: 1.5rem;
    contain: content;
    font-size: 0.4em;
    margin-left: 1.75rem;
    position: absolute;
    width: 0;

    @media (max-width: 700px) {
        margin-left: 1rem;
    }
`;

interface TimeProps {
    time: { hour: number; minute: number; second: number };
    hourFormat24: boolean;
    padHour: boolean;
    showSeconds: boolean;
    showPostFix: boolean;
    flashSeparators: boolean;
}

export function Time({ time, hourFormat24, padHour, showSeconds, showPostFix, flashSeparators }: TimeProps) {
    let hour = time.hour;
    const afterNoon = hour >= 12;

    if (!hourFormat24) {
        if (afterNoon) {
            hour -= 12;
        }
        if (hour === 0) {
            hour = 12;
        }
    }

    const isFlashing = flashSeparators && time.second % 2 === 0;

    return (
        <TimeWrapper>
            <span>{padHour ? pad(hour) : hour}</span>
            <Colon $flash={isFlashing}> : </Colon>
            <span>{pad(time.minute)}</span>
            {showSeconds && <Colon $flash={isFlashing}> : </Colon>}
            {showSeconds && <span>{pad(time.second)}</span>}
            {!hourFormat24 && showPostFix && <PostFix>{afterNoon ? 'PM' : 'AM'}</PostFix>}
        </TimeWrapper>
    );
}
