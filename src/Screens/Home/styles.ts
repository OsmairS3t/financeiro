import styled from "styled-components/native";
import { Calendar, ListDashes, Plus } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'

export const Container = styled.SafeAreaView`
    background-color: ${({ theme }) => theme.COLORS.BG_SCREEN};
`;

export const GroupButtonsHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding: 0 10px;
`;

export const ButtonNavigate = styled(TouchableOpacity)`
    padding: 5px;
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
    font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
`;

export const SubTextResumeGraphic = styled.Text`
    font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
`;

export const ContainerGraphic = styled.View`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ListBalances = styled(ListDashes)``;

export const NewBalances = styled(Plus)``;

export const TitleTransactions = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
    font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
    color: ${({ theme }) => theme.COLORS.TEXT_DEFAULT};
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const ListRsume = styled.View`
    height: 65%;
`;
