import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native';
import Highlight from '@components/Highlight';
import { Categories, Balances } from '@utils/database';
import {
    Container,
    Title,
    GroupBlock,
    Block,
    TitleBlock,
    TextBlock,
    BlockSummary,
    TextResume,
} from './styles'
import { useEffect, useState } from 'react';
import { IBalance } from '@utils/interfaces';

type RouteParams = {
    idcategory: number;
    datecategory: string;
}

export function DetailCategory() {
    let sumCategory = 0
    const [balances, setBalances] = useState<IBalance[]>([])
    const [colorCategory, setColorCategory] = useState<string>('');
    const [nameCategory, setNameCategory] = useState<string>('');
    const navigator = useNavigation();
    const route = useRoute();
    const { idcategory, datecategory } = route.params as RouteParams;

    function handleBack() {
        navigator.navigate('home')
    }

    function searchCategory(id: number) {
        const name = Categories.find(category => category.id === id)?.name;
        name ? setNameCategory(name) : setNameCategory('-')
    }

    useEffect(() => {
        searchCategory(idcategory)
        setBalances(Balances
            .filter(balance => balance.category === idcategory)
            .filter(balance => balance.datebalance === datecategory))
    }, [idcategory])

    return (
        <Container>
            <Highlight
                onPress={handleBack}
                title={nameCategory}
                colorBG={colorCategory}
            />
            <Title>Todos os lançamentos de {datecategory}</Title>
            {balances.map(balance => (
                <GroupBlock key={balance.id}>
                    <Block>
                        <TitleBlock>Descrição:</TitleBlock>
                        <TextBlock>{balance.name}</TextBlock>
                    </Block>
                    <Block>
                        <TitleBlock>Tipo:</TitleBlock>
                        <TextBlock>
                            {balance.typebalance === 'income' ?
                                'Entrada' : 'Saída'
                            }
                        </TextBlock>
                    </Block>
                    <Block>
                        <TitleBlock>Valor:</TitleBlock>
                        <TextBlock>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(balance.price)}
                        </TextBlock>
                    </Block>
                    <Block>
                        <TitleBlock>Comprovante:</TitleBlock>
                        <TextBlock>{balance.file}</TextBlock>
                    </Block>
                    <BlockSummary>
                        <TextResume>{Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(sumCategory + balance.price)}
                        </TextResume>
                    </BlockSummary>
                </GroupBlock>
            ))}
        </Container>
    )
}