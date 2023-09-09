import styled from "styled-components/native";
import {SignOut} from 'phosphor-react-native'

export const Container = styled.View`
    background-color: ${({ theme }) => theme.COLORS.BG_APP};
    padding-top: 20px;
    width: 100%;
    height: 100px;
    padding-left: 5px;
    padding-right: 5px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const Logo = styled.Image`
    width: 80px;
    height: 80px;
`;  

export const IconSignOut = styled(SignOut)`
    color: ${({ theme }) => theme.COLORS.ICON_HEADER};
`;

export const TextGroup = styled.View`
    flex: 1;
    flex-direction: column;
    align-items: center;
`;

export const Title = styled.Text`
    font-size: ${({ theme })=> theme.FONT_SIZE.XL}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
    color: ${({ theme }) => theme.COLORS.TEXT_BLOCK};
`;

export const SubTitle = styled.Text`
    font-size: ${({ theme })=> theme.FONT_SIZE.MD}px;
    color: ${({ theme }) => theme.COLORS.TEXT_BLOCK};
`;
