import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

type PropsButton = {
    isActive: boolean
}

export const Container = styled.View`
    justify-content: 'center';
    align-items: 'center';
    margin-top: 130px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 10px;
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.COLORS.BORDER_INPUT};
    background-color: ${({ theme }) => theme.COLORS.BG_INPUT};
`;

export const ItemSelectView = styled(TouchableOpacity)<PropsButton>`
    max-height: 56px;
    min-height: 56px;
    padding: 6px;
    border-radius: 0px;
    align-items: 'center';
    justify-content: center;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${({ theme }) => theme.COLORS.BORDER_INPUT};
    background-color: ${({ theme, isActive }) => isActive ? theme.COLORS.BG_BLOCK : theme.COLORS.BG_INPUT};
`;

export const SelectText = styled.Text`
    text-align: center;
    font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
    font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
    color: ${({ theme }) => theme.COLORS.TEXT_INPUT};
`;
