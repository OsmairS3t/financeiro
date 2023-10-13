import { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native'

import Highlight from '@components/Highlight';
import Header from '@components/Header';

import { ASYNCSTORAGE_KEY_BALANCES } from '@env'
import { IBalance } from '@utils/interfaces';

import { Categories } from '@utils/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    Container,
    Content,
    Title,
    GroupBlock,
    Block,
    TitleBlock,
    TextBlock,
    BlockSummary,
    TextResume,
} from './styles'

type RouteParams = {
    idcategory: number;
    colorcategory: string;
}

export function DetailCategory() {
    const keyBalances = ASYNCSTORAGE_KEY_BALANCES
    let sumCategory = 0
    const [balances, setBalances] = useState<IBalance[]>([])
    const [nameCategory, setNameCategory] = useState<string>('');
    const navigator = useNavigation();
    const route = useRoute();
    const { idcategory, colorcategory } = route.params as RouteParams;

    function handleBack() {
        navigator.navigate('home')
    }

    function searchCategory(id: number) {
        const name = Categories.find(category => category.id === id)?.name;
        name ? setNameCategory(name) : setNameCategory('-')
    }

    async function getBalances() {
        try {
            const result = await AsyncStorage.getItem(keyBalances)
            const resultJson: IBalance[] = result ? JSON.parse(result) : []
            setBalances(resultJson.filter(res => res.category === idcategory))
        } catch (error) {
            console.log('Erro ao recuperar valor do AsyncStorage')
        }
    }

    useEffect(() => {
        searchCategory(idcategory)
        getBalances()
    }, [idcategory])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <Header />
                <Highlight
                    onPress={handleBack}
                    title={nameCategory}
                    colorBG={colorcategory}
                />
                <Content>
                    <Title>Todos os lançamentos</Title>
                    <FlatList
                        data={balances}
                        renderItem={({ item }) => (
                            <GroupBlock key={item.id}>
                                <Block>
                                    <TitleBlock>Descrição:</TitleBlock>
                                    <TextBlock>{item.description}</TextBlock>
                                </Block>
                                <Block>
                                    <TitleBlock>Tipo:</TitleBlock>
                                    <TextBlock>
                                        {item.typebalance === 'income' ?
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
                                        }).format(item.price)}
                                    </TextBlock>
                                </Block>
                                <Block>
                                    <TitleBlock>Comprovante:</TitleBlock>
                                    <TextBlock>{item.file}</TextBlock>
                                </Block>
                                <BlockSummary>
                                    <TextResume>{Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(sumCategory + item.price)}
                                    </TextResume>
                                </BlockSummary>
                            </GroupBlock>
                        )}
                        ListEmptyComponent={
                            <TextBlock>
                                Não foram encontrados lançamentos nessa categoria.
                            </TextBlock>
                        }
                    />
                </Content>
            </Container>
        </SafeAreaView >
    )
}