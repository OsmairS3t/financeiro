import styled from 'styled-components/native'
import { Button } from 'react-native'

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: ${({ theme }) => theme.COLORS.BG_APP};
`;

export const HeaderSignIn = styled.View`
    margin-top: 70px;
`;

export const Logo = styled.Image`
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.COLORS.TITLE_APP};
    font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
`;

export const Form = styled.View`
    flex: 1;
    gap: 15px;
    margin-top: 70px;
`;

export const TextButton = styled.Text`
    font-family: ${({theme }) => theme.FONT_FAMILY.BOLD};
    font-size: ${({theme }) => theme.FONT_SIZE.XL}px; 
    color: ${({theme }) => theme.COLORS.TITLE_BUTTON};
`;

export const TextError = styled.Text`
    font-size: ${({ theme }) =>theme.FONT_SIZE.SM}px;
    color: ${({ theme }) =>theme.COLORS.ERROR};
`;

export const BtnSocial = styled.Pressable`
    width: fit-content;
    height: 55px;
    padding: 0px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-radius: 10px;
    background-color: ${({ theme})=>theme.COLORS.BG_SCREEN};
`;

export const IconBtnSocial = styled.Image`
    width: 50px;
    height: 50px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
`;

export const TextBtnSocial = styled.Text`
    margin-left: 50px;
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    color: ${({theme}) => theme.COLORS.TEXT_DEFAULT};
`;

export const TextNewReg = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    color: ${({theme}) => theme.COLORS.TEXT_BLOCK};
    text-align: center;
`;
