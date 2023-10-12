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

    function resumeTotalBalanceCategory() {
        let arrBalanceCategories: IResumeCategory[] = []
        let totCategories = 0;
        let sumIncomeCategory = 0
        let sumOutcomeCategory = 0
        let balance_category = 0
        let dataResume: IResumeCategory

        Categories.map(category => {
            sumIncomeCategory = 0
            sumOutcomeCategory = 0
            const balancesFilteredCategory: IBalance[] = balances.filter(balance => balance.category === category.id)
            if (balancesFilteredCategory) {
                balancesFilteredCategory.map(bfc => {
                    if (bfc.typebalance === 'income') {
                        sumIncomeCategory = sumIncomeCategory + bfc.price
                    } else {
                        sumOutcomeCategory = sumOutcomeCategory + bfc.price
                    }
                    balance_category = sumIncomeCategory - sumOutcomeCategory;
                })
                dataResume = {
                    idcategory: category.id,
                    iconcategory: category.icon,
                    namecategory: category.name,
                    colorcategory: category.color,
                    balancecategory: balance_category,
                    datebalance: dateBase
                }
            } else {
                dataResume = {
                    idcategory: category.id,
                    iconcategory: category.icon,
                    namecategory: category.name,
                    colorcategory: category.color,
                    balancecategory: 0,
                    datebalance: dateBase
                }
            }
            arrBalanceCategories.push(dataResume)
            totCategories = totCategories + (sumIncomeCategory - sumOutcomeCategory)
        })
        setTotalBalance(totCategories)
        setResumes(arrBalanceCategories)
    }

    function resumeTotal() {
        let totCategories = 0;
        let sumIncomeCategory = 0
        let sumOutcomeCategory = 0
        let balance_category = 0
        let arrBalanceCategories: IResumeCategory[] = []
        let dataResume: IResumeCategory

        sumIncomeCategory = 0
        sumOutcomeCategory = 0
        const Balances = [
            {
                id: '1',
                category: 1,
                typebalance: 'income',
                description: 'Coca-cola Lata 350ml',
                price: 35,
                datebalance: '01/08/2023',
                file: 'file001.png'
            },
            {
                id: '2',
                category: 2,
                typebalance: 'income',
                description: 'Luz Jovem',
                price: 10,
                datebalance: '01/08/2023',
                file: 'file001.png'
            },
            {
                id: '3',
                category: 1,
                typebalance: 'income',
                description: 'Balas diversas',
                price: 29,
                datebalance: '03/08/2023',
                file: 'file001.png'
            }
        ]

        //   const sumWithInitial = Balances.reduce((accumulator, balance) => {
        //     if(!accumulator[balance.category]) {
        //       accumulator[balance.category] = []
        //     }
        //     accumulator[balance.category].push({balance})
        //     return accumulator
        //   }, {});

        // console.log(sumWithInitial);
    }

    useEffect(() => {
        getBalances();
        resumeTotalBalanceCategory()
    }, [])

    useFocusEffect(useCallback(() => {
        resumeTotalBalanceCategory();
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
