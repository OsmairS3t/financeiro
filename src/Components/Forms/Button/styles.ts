import styled from "styled-components/native";
import { Pressable } from "react-native";

export const Container = styled(Pressable)`
    width: 100%;
    max-height: 60px;
    min-height: 60px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.COLORS.BG_BUTTON};
`;
