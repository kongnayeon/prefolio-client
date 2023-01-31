import styled, { CSSProperties } from 'styled-components';
import { shadow, theme } from '../../../styles/theme';

interface TagProps {
  type: 'activity' | 'field' | undefined;
  sort?: 'PLAN' | 'DEV' | 'DESIGN' | 'SOCIETY' | 'INTERN' | 'PROJECT' | any;
  content?: string;
  style?: CSSProperties;
}

interface ITag {
  field: 'PLAN' | 'DEV' | 'DESIGN' | any;
  // color?: 'mint' | 'blue' | 'purple' | any;
}

/**
 * 태그 컴포넌트
 * @param type activity인지 field인지 - 둘다 해당 안되는 경우 공백
 * @param sort society, intern, project, plan, dev, design, 이외에는 작성한대로
 * @param style 인라인 style
 */

export function Tag({ type, sort, style }: TagProps) {
  return type === 'activity' ? (
    <ActivityTag id={sort} style={style}>
      {sort === 'SOCIETY'
        ? '동아리/학회'
        : sort === 'INTERN'
        ? '인턴'
        : sort === 'PROJECT'
        ? '프로젝트'
        : sort}
    </ActivityTag>
  ) : type === 'field' ? (
    <FieldTag id={sort} field={sort} style={style}>
      {sort === 'PLAN'
        ? '기획'
        : sort === 'DEV'
        ? '개발'
        : sort === 'DESIGN'
        ? '디자인'
        : sort}
    </FieldTag>
  ) : (
    <></>
  );
}

const ActivityTag = styled.button`
  ${theme.typo.Label2}
  padding: 6px 10px;
  width: auto !important;
  height: 28px;
  border-radius: 4px;
  background-color: ${theme.palette.Gray10};
  color: ${theme.palette.Gray50};
  box-shadow: ${shadow.Button.Black};
  text-overflow: initial;
  word-break: keep-all !important;

  cursor: default;
`;

const FieldTag = styled.button<ITag>`
  ${theme.typo.Label2}
  padding: 6px 10px;
  width: auto;
  height: 28px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.field === 'plan'
      ? theme.palette.Mint10
      : props.field === 'dev'
      ? theme.palette.Blue10
      : props.field === 'design' && theme.palette.Purple10};
  color: ${(props) =>
    props.field === 'plan'
      ? theme.palette.Mint100
      : props.field === 'dev'
      ? theme.palette.Blue100
      : props.field === 'design' && theme.palette.Purple100};
  box-shadow: ${(props) =>
    props.field === 'plan'
      ? shadow.Button.Green
      : props.field === 'dev'
      ? shadow.Button.Blue
      : props.field === 'design' && shadow.Button.Purple};

  cursor: default;
  word-break: keep-all !important;
`;
