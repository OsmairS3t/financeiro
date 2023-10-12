import styled from "styled-components/native";
import { TouchableOpacity } from 'react-native';
import { Calendar } from 'phosphor-react-native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.COLORS.BG_SCREEN};
    `;

export const Content = styled.View`
    padding: 10px;
`;

export const Title = styled.Text`
    font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
    color: ${({ theme }) => theme.COLORS.TEXT_DEFAULT};
`;

export const GroupHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
`;

export const ButtonInputDate = styled.Pressable`
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
