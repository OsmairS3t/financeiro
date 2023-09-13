import styled from "styled-components/native";
import { Pressable } from "react-native";

export const Container = styled(Pressable)`
    width: 320px;
    max-height: 60px;
    min-height: 60px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.COLORS.BG_BUTTON};
`;

export const Title = styled.Text`
    font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
    color: ${({ theme }) => theme.COLORS.TITLE_BUTTON};
`;