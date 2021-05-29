import styled, { css } from 'styled-components'

const gapStyles = ({
  gap,
  layout,
  wrapped,
}: { [key in 'layout' | 'gap' | 'wrapped']?: number | string | boolean }) => {
  if (!gap) return ''

  if (layout === 'horizontal') {
    return `
      & > :not(:last-child) {
        margin-right: ${gap}px;
        margin-bottom: ${wrapped ? `${gap}px` : 0};
      }
    `
  }

  return `
      & > :not(:last-child) {
        margin-bottom: ${gap}px;
      }
    `
}

export const Block = styled.div<{
  layout?: 'horizontal' | 'vertical'
  gap?: number
  justify?: 'initial' | 'center' | 'space-between' | 'space-around' | 'flex-end'
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch'
  spreadX?: boolean
  spreadY?: boolean
  wrapped?: boolean
  zeroMinWidth?: boolean
  zeroMinHeight?: boolean
}>`
  display: flex;
  flex-direction: ${({ layout }) =>
    layout === 'horizontal' ? 'row' : 'column'};
  justify-content: ${({ justify }) => (justify ? justify : 'initial')};
  align-items: ${({ align }) => (align ? align : 'initial')};
  ${gapStyles};

  ${({ zeroMinWidth }) =>
    zeroMinWidth &&
    css`
      min-width: 0;
    `};
  ${({ zeroMinHeight }) =>
    zeroMinHeight &&
    css`
      min-height: 0;
    `};

  ${({ wrapped }) =>
    wrapped &&
    css`
      flex-wrap: wrap;
    `}

  ${({ spreadX }) =>
    spreadX &&
    css`
      width: 100%;
    `}

  ${({ spreadY }) =>
    spreadY &&
    css`
      height: 100%;
    `}
`

export const BlockGroup = styled(Block)``
