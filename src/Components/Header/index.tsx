import React from 'react';
import { useNavigation } from '@react-navigation/native';
import logoLuzJovem from '@assets/luzjovem.png'

import {
    Container,
    Logo,
    TextGroup,
    Title,
    SubTitle,
    ButtonSignOut,
    IconSignOut
} from './styles';

export default function Header() {
    const navigation = useNavigation();

    function handleSignOut() {
        navigation.navigate('signin')
    }

    return (
        <Container>
            <Logo source={logoLuzJovem} />
            <TextGroup>
                <Title>TESOURARIA</Title>
                <SubTitle>Luz Jovem Anápolis</SubTitle>
            </TextGroup>
            <ButtonSignOut onPress={handleSignOut}>
                <IconSignOut size={35} color='#FFFFFF' />
            </ButtonSignOut>
        </Container>
    )
}

