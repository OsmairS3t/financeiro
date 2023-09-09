import React from 'react';

import { Container, 
    Logo, 
    TextGroup, 
    Title, 
    SubTitle, 
    IconSignOut
 } from './styles';
import logoLuzJovem from '@assets/luzjovem.png'

export default function Header() {
    return (
        <Container>
            <Logo source={logoLuzJovem} />
            <TextGroup>
                <Title>TESOURARIA</Title>
                <SubTitle>Luz Jovem Anápolis</SubTitle>
            </TextGroup>
            <IconSignOut size={35} color='#FFFFFF' />
        </Container>
    )
}

