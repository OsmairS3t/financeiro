import styled from "styled-components/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { List, Plus } from 'phosphor-react-native'

export const Container = styled.SafeAreaView`
    background-color: ${({ theme }) => theme.COLORS.BG_SCREEN};
    padding-top: 5px;
`;

export const GroupButtonsHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

export const ButtonNavigate = styled.TouchableOpacity`
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 5px;
    min-height: 30px;
    max-height: 30px;
`;

export const GroupInput = styled.View`
    width: 50%;
`;

export const ButtonDate = styled.Pressable`
    padding: 10px;
    border-width: 1px;
    border-style: solid;
    align-items: center;
    border-color: ${({ theme }) => theme.COLORS.BORDER_INPUT};
    background-color: ${({ theme }) => theme.COLORS.BG_INPUT};
`;

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

export const ListBalances = styled(List)``;

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
