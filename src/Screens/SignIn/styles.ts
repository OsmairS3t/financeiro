import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    background-color: ${({ theme }) => theme.COLORS.BG_APP};
`;

export const Logo = styled.Image`
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.COLORS.TITLE_APP};
    font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
`;

export const Form = styled.View`
    flex: 1;
    gap: 10px;
`;

export const TextButton = styled.Text``;

export const TextError = styled.Text`
    font-size: ${({ theme }) =>theme.FONT_SIZE.SM}px;
    color: ${({ theme }) =>theme.COLORS.ERROR};
`;
