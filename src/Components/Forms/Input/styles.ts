import styled from 'styled-components/native';
import { TextInput } from 'react-native';

export const Container = styled(TextInput)`
    flex: 1;
    width: 100%;
    min-height: 56px;
    max-height: 56px;
    
    background-color: ${({ theme }) => theme.COLORS.BG_INPUT};
    color: ${({ theme }) => theme.COLORS.TEXT_INPUT};
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
        
    border-radius: 6px;
    border-width: 1px;
    border-color: ${({ theme })=> theme.COLORS.BORDER_INPUT};
    padding: 16px;
    margin-top: 10px;
`;
