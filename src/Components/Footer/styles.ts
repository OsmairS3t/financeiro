import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    height: 30px;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.COLORS.BG_APP};
`;

export const Text = styled.Text`
    color: ${({ theme }) => theme.COLORS.TEXT_BLOCK};
`;