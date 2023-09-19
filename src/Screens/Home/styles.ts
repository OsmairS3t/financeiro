import styled from "styled-components/native";
import { Calendar, ListDashes, Plus } from 'phosphor-react-native'
import { Pressable, TouchableOpacity } from 'react-native'

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.COLORS.BG_SCREEN};
    flex-direction: column;
    justify-content: space-between;
`;

export const Content = styled.View`
    flex: 1;
`;

export const GroupButtonsHeader = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
`;

export const GroupInput = styled.View`
    width: 50%;
    padding: 5px;
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
    justify-content: center;
`;

export const ButtonDate = styled(TouchableOpacity)`
    padding: 10px;
    border-width: 1px;
    border-style: solid;
    align-items: center;
    border-color: ${({ theme }) => theme.COLORS.BORDER_INPUT};
    background-color: ${({ theme }) => theme.COLORS.BG_INPUT};
`;

export const IconDate = styled(Calendar).attrs(({theme})=>({
    size: 36,
    color: theme.COLORS.BR_BLOCK
}))``;

export const GroupGraphic = styled.View`
    flex-direction: row;
    gap: 2px;
`;

export const ResumeGraphic = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
    gap: 4px;
`;

export const TextResumeGraphic = styled.Text`
    font-size: 28px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const SubTextResumeGraphic = styled.Text`
    font-size: 18px;
`;

export const ContainerGraphic = styled.View`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const TitleTransactions = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
    font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
    color: ${({ theme }) => theme.COLORS.TEXT_DEFAULT};
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const ListRsume = styled.View``;

export const GroupButton = styled.View`
    margin-top: 20px;
    padding: 10px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center; 
`;
    
export const BtnList = styled(Pressable)`
    padding: 10px;
    height: 50px;
    width: 150px;
    background-color: ${({ theme }) => theme.COLORS.BG_BUTTON};
    border-radius: 8px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
`;

export const BtnAdd = styled(Pressable)`
    padding: 10px;
    height: 50px;
    width: 150px;
    background-color: ${({ theme }) => theme.COLORS.BG_BUTTON}; 
    border-radius: 8px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
`;

export const ListBalances = styled(ListDashes).attrs(({theme})=>({
    color: theme.COLORS.BG_SCREEN
}))`
`;

export const NewBalances = styled(Plus).attrs(({theme})=>({
    color: theme.COLORS.BG_SCREEN
}))``;
    
export const TextButton = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};    
    color: ${({ theme }) => theme.COLORS.BG_SCREEN};
    font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
`;
