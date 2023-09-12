import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;

export const Error = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.ERROR};
  margin: 7px 0;
`;
