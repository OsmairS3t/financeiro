import styled from 'styled-components/native'
import { CaretLeft } from 'phosphor-react-native'
import { Pressable } from 'react-native';

type PropsSelectEdit = {
    isEmpty: boolean;
}

type PropsText = {
    isBold?: boolean;
}

export const Container = styled.View`
    flex: 1;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.COLORS.BG_SCREEN};
`;

export const Form = styled.View`
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px;
`;

export const ContainerButton = styled.View`
    width: 100%;
    padding: 20px;
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

export const GroupImage = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    gap: 10px;
`;

export const GroupButton = styled.View`
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
`;

export const ModalView = styled.Modal``;

export const BtnImage = styled.Pressable`
    width: 100px;
    height: 80px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-style: dotted;
    background-color: ${({ theme }) => theme.COLORS.BG_BUTTON};
    `;

export const BtnImageText = styled.Text`
    text-align: center;
    font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
    color: ${({ theme }) => theme.COLORS.TITLE_BUTTON};
`;

export const TextButton = styled.Text`
    text-align: center;
    font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
    color: ${({ theme }) => theme.COLORS.TITLE_BUTTON};
`;

