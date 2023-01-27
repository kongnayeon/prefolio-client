import { useEffect } from 'react';
import { Dispatch, SetStateAction, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Dot } from '../../assets/icons';
import { theme } from '../../styles/theme';
import { Text } from '../common/Wrapper';

export interface TabBarProps {
  barState: boolean;
  setBarState: Dispatch<SetStateAction<boolean>>;
  leftTab?: string;
  rightTab?: string;
}

/**
 * @param barState: boolean (기본값: true)
 * @param setBarState: Dispatch<SetStateAction<boolean>>;
 * @param leftTab?: string (왼쪽 탭 텍스트)
 * @param rightTab?: string (오른쪽 탭 텍스트)
 * ---------------------------------------
 * true: 왼쪽
 * false: 오른쪽
 */

export const TagTabBar = ({
  barState,
  setBarState,
  leftTab = '최신순',
  rightTab = '추천순',
}: TabBarProps) => {
  const ref = useRef<HTMLDivElement[] | null[]>([]);

  const HandleTabClick = (e: any) => {
    setBarState(e.target.parentNode.id === 'new' ? true : false);
  };

  return (
    <TabBarWrapper>
      <Button id='new' onClick={HandleTabClick} barState={barState}>
        <Dot
          fill={barState ? `${theme.palette.Black}` : `${theme.palette.Gray20}`}
        />
        <Text typo='Body2' color={barState ? 'Black' : 'Gray20'} height={16}>
          {leftTab}
        </Text>
      </Button>
      <Button id='like' onClick={HandleTabClick} barState={barState}>
        <Dot
          fill={barState ? `${theme.palette.Gray20}` : `${theme.palette.Black}`}
        />
        <Text typo='Body2' color={barState ? 'Gray20' : 'Black'} height={16}>
          {rightTab}
        </Text>
      </Button>
    </TabBarWrapper>
  );
};

const TabBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  cursor: pointer;

  width: 128px;
`;

const Button = styled.button<{
  barState: boolean;
}>`
  width: 58px;
  height: 16px;
  padding: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0;
`;
