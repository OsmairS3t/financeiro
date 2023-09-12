import styled from 'styled-components/native'
import { Camera, Image } from 'phosphor-react-native'
import { Pressable, Image as Img } from 'react-native';

type PropsSelectEdit = {
    isEmpty: boolean;
}

type PropsText = {
    isBold?: boolean;
}

type PropsBox = {
    size?: number;
}

export const Container = styled.View`
    flex: 1;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.COLORS.BG_SCREEN};
    padding-left: 20px;
    padding-right: 20px;
`;

export const Form = styled.View`
    flex: 1;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
`;

export const GroupSwitch = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`;

export const TextSwitch = styled.Text<PropsText>`
    text-align: right;
    padding-right: 5px;
    color: ${({ theme }) => theme.COLORS.TEXT_DEFAULT};
    font-weight: ${({ isBold }) => isBold ? "bold" : "normal"};
`;

export const ButtonSelectOpen = styled(Pressable)`
    margin-top: 10px;
    padding: 10px;
    width: 100%;
    min-height: 56px;
    max-height: 56px;
    border-radius: 10px;
    border-width: 1px;
    border-color: ${({ theme }) => theme.COLORS.BORDER_BLOCK};
    justify-content: center;
    align-items: flex-start;
    background-color: ${({ theme }) => theme.COLORS.BG_INPUT};
`;

export const TextButtonSelectOpen = styled.Text<PropsSelectEdit>`
    font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
    color: ${({ theme, isEmpty }) => isEmpty ? theme.COLORS.TEXT_INPUT : theme.COLORS.TEXT_DEFAULT};
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
`;

export const ModalView = styled.Modal``;

export const GroupImage = styled.View`
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
`;

export const GroupButton = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
`;

export const PhotoImage = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const ImgCapture = styled(Img)`
    width: 280px;
    height: 280px;
`;

export const BtnImage = styled.Pressable`
    width: 40px;
    height: 40px;
    padding: 5px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.COLORS.BG_SCREEN};
`;

export const IconCamera = styled(Camera).attrs(({theme})=>({
    size: 32,
    color: theme.COLORS.ICON_LIST
}))``;

export const IconImage = styled(Image).attrs(({theme})=>({
    size: 32,
    color: theme.COLORS.ICON_LIST
}))``;

export const BoxInput = styled.View<PropsBox>`
    width: ${({ size }) => size}%;
`;

export const TextButton = styled.Text`
    text-align: center;
    font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
    color: ${({ theme }) => theme.COLORS.TITLE_BUTTON};
`;

export const ContainerButton = styled.View`
    width: 100%;
    padding: 20px;
`;
