import styled from "styled-components/native";
import { Pressable } from "react-native";

export const Container = styled(Pressable)`
    width: fit-content;
    max-height: 60px;
    min-height: 60px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.COLORS.BORDER_BUTTON};
    background-color: ${({ theme }) => theme.COLORS.BG_BUTTON};
`;

export const Title = styled.Text`
    font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
    color: ${({ theme }) => theme.COLORS.TITLE_BUTTON};
`;