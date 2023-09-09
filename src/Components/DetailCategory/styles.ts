import styled from 'styled-components/native'

export const Container = styled.View`
    padding: 15px;
`;

export const Title = styled.Text`
    border-bottom-width: 1px;
    border-style: solid;
    text-align: center;
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
`;

export const GroupBlock = styled.View`
    border-top-width: 1px;
    border-style: dotted;
    border-color: ${({ theme }) => theme.COLORS.BORDER_BLOCK};
    padding-bottom: 10px;
`;

export const Block = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-top: 5px;
`;

export const TitleBlock = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const TextBlock = styled.Text`
    flex: 1;
    margin-left: 10px;
`;

export const BlockSummary = styled.View`
    border-top-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.COLORS.BORDER_BLOCK};
`;

export const TextResume = styled.Text`
    text-align: right;
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
`;
