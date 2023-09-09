import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    padding: 10px;
    background-color: ${({ theme }) => theme.COLORS.BG_SCREEN};
`;

export const Title = styled.Text`
    font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
    color: ${({ theme }) => theme.COLORS.TEXT_DEFAULT};
`;

export const GroupSwitch = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`;

export const TextSwitch = styled.Text`
    text-align: right;
    padding-right: 5px;
    color: ${({ theme }) => theme.COLORS.TEXT_DEFAULT};
`;

export const List = styled.FlatList`
    flex: 1;
`;
