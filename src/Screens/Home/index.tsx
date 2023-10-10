import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    FlatList,
    TouchableOpacity,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { IBalance, IResumeCategory } from '@utils/interfaces';
import { Categories } from '@utils/database';

import Header from '@components/Header';
import Footer from '@components/Footer';
import ResumeCategory from '@components/ResumeCategory';
import { Graphic } from '@components/Graphic';

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
    const keyBalances = '@LJF:Balances'
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
            arrBalanceCategories.push(dataResume)
            totCategories = totCategories + (sumIncomeCategory - sumOutcomeCategory)
        })
        setTotalBalance(totCategories)
        setResumes(arrBalanceCategories)
        //return (arrBalanceCategories)
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
