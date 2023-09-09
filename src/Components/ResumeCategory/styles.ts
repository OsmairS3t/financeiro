import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native"

type colorcategoryProps ={
    colorCategory: string;
}

export const Container = styled.TouchableOpacity<colorcategoryProps>`
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 3px;
    margin-left: 10px;
    margin-right: 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: ${({ theme }) => theme.COLORS.BG_BLOCK};
    border-left-width: 10px;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-right-width: 1px;
    border-color: ${({ colorCategory }) => colorCategory};
`;

export const LineColorIdentity = styled.View<colorcategoryProps>`
    width: 10px;
    height: 100%;
    margin-right: 5px;
    background-color: ${({ colorCategory }) => colorCategory};
`;

export const IconTransaction = styled(MaterialIcons).attrs(({theme})=>({
    size: 24,
    color: theme.COLORS.ICON_LIST
}))``;

export const TextTransaction = styled.Text`
    flex: 1;    
    margin-left: 10px;
    margin-right: 10px;
    font-size: 18px;
    color: ${({ theme }) => theme.COLORS.TEXT_DEFAULT};
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

export const PriceTransaction = styled.Text`
    font-size: 18px;
    color: ${({ theme }) => theme.COLORS.TEXT_DEFAULT};
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;
