import { useState, useEffect, useCallback } from 'react';
import { FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ASYNCSTORAGE_KEY_BALANCES } from '@env'
import Header from '@components/Header';
import Footer from '@components/Footer';
import ResumeCategory from '@components/ResumeCategory';
import { Graphic } from '@components/Graphic';

import { Categories } from '@utils/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IBalance, IResumeCategory } from '@utils/interfaces';

import {
    Container,
    Content,
    ListBalances,
    NewBalances,
    GroupGraphic,
    ResumeGraphic,
    TextResumeGraphic,
    SubTextResumeGraphic,
    ContainerGraphic,
    ListRsume,
    GroupButton,
    BtnList,
    BtnAdd,
    TextButton,
    TitleTransactions
} from './styles';

export function Home() {
    const keyBalances = ASYNCSTORAGE_KEY_BALANCES;
    const navigation = useNavigation();

    const [balances, setBalances] = useState<IBalance[]>([])
    const [totalBalance, setTotalBalance] = useState(0)
    const [resumes, setResumes] = useState<IResumeCategory[]>([])
    const [dateBase, setDateBase] = useState(Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(new Date()))
    //const [user, setUser] = useState('')

    async function getBalances() {
        try {
            const bal = await AsyncStorage.getItem(keyBalances);
            const result = bal ? JSON.parse(bal) : []
            setBalances(result)
        } catch (error) {
            console.log('Erro ao recuperar valor do AsyncStorage')
        }
    }

    function handleListBalance() {
        navigation.navigate('listbalance')
    }

    function handleNewBalance() {
        navigation.navigate('balance')
    }

    function TotalByCategory(category: number, balance: IBalance[]) {
        let totalIncome = 0
        let totalOutcome = 0
        balance.map(bal => {
            if (bal.typebalance === 'income') {
                totalIncome = totalIncome + bal.price
            }
            if (bal.typebalance === 'outcome') {
                totalOutcome = totalOutcome + bal.price
            }
        })
        return (totalIncome - totalOutcome)
    }

    function ResumeByCategory() {
        let arrBalanceCategories: IResumeCategory[] = []
        let dataResumeCategory: IResumeCategory
        let totCategories = 0
        Categories.map(category => {
            const totalCategory = TotalByCategory(category.id, balances.filter(balance => balance.category === category.id))
            dataResumeCategory = {
                idcategory: category.id,
                iconcategory: category.icon,
                namecategory: category.name,
                colorcategory: category.color,
                balancecategory: totalCategory,
                datebalance: dateBase
            }
            totCategories = totCategories + totalCategory
            arrBalanceCategories.push(dataResumeCategory)
        })
        setTotalBalance(totCategories)
        return arrBalanceCategories
    }

    useEffect(() => {
        getBalances();
        setResumes(ResumeByCategory)
        //resumeTotalBalanceCategory()
    }, [])

    useFocusEffect(useCallback(() => {
        setResumes(ResumeByCategory)
        //resumeTotalBalanceCategory();
    }, []));

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header />
                    <Content>
                        <GroupGraphic>
                            <ResumeGraphic>
                                <TextResumeGraphic>
                                    {Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(totalBalance)}
                                </TextResumeGraphic>
                                <SubTextResumeGraphic>Total Balanço</SubTextResumeGraphic>
                            </ResumeGraphic>
                            <ContainerGraphic>
                                <Graphic resumesCategory={resumes} />
                            </ContainerGraphic>
                        </GroupGraphic>

                        <ListRsume>
                            <TitleTransactions>RESUMO DE CAIXA</TitleTransactions>
                            <FlatList
                                data={resumes}
                                keyExtractor={item => String(item.idcategory)}
                                renderItem={({ item }) => (
                                    <ResumeCategory balanceCategory={item} />
                                )}
                                showsVerticalScrollIndicator={false}
                            />
                        </ListRsume>
                    </Content>

                    <GroupButton>
                        <BtnList testID='Listar' onPress={handleListBalance}>
                            <ListBalances size={22} />
                            <TextButton>Listar</TextButton>
                        </BtnList>
                        <BtnAdd onPress={handleNewBalance}>
                            <NewBalances size={22} />
                            <TextButton>Lançamento</TextButton>
                        </BtnAdd>
                    </GroupButton>

                    <Footer />
                </Container>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}
