import { TouchableOpacity } from 'react-native'
import styled from "styled-components/native";
import { CaretLeft } from 'phosphor-react-native'

type Props ={
    colorBackground?: string;
}

export const Container = styled.View<Props>`
    flex-direction: row;
    align-items: center;
    background-color: ${({colorBackground})=>colorBackground};
`;

export const ButtonHighlightIcon = styled.TouchableOpacity`
    width: 10px;
`;

export const Icon = styled(CaretLeft).attrs(({theme})=>({
    size: 30,
    color: theme.COLORS.ICON_LIST,
}))``;

export const GroupTitle = styled.View`
    flex: 1;
    margin-left: 25px;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    font-size: 24px;
`;
