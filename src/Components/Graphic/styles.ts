import styled from 'styled-components/native'

export const Container = styled.View`
    width: 100%;
    height: 230px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const MessageView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const MessageEmpty = styled.Text`
    padding: 20px;
    width: 250px;
    height: 100px;
    border: 1px;
    text-align: center;
    border-style: dotted;
    border-color: ${({ theme }) => theme.COLORS.BORDER_INPUT};
    color: ${({ theme }) => theme.COLORS.TEXT_DEFAULT};
`;

