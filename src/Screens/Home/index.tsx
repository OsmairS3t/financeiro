import { useState, useEffect } from 'react';
import { FlatList, TextInput, TouchableOpacity, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { IResumeCategory } from '@utils/interfaces';
import { Balances, Categories } from '@utils/database';
import ResumeCategory from '@components/ResumeCategory';
import { Graphic } from '@components/Graphic';

import {
    Container,
    GroupButtonsHeader,
    ButtonNavigate,
    ListBalances,
    NewBalances,
    ButtonDate,
    IconDate,
    GroupInput,
    GroupGraphic,
    ResumeGraphic,
    TextResumeGraphic,
    SubTextResumeGraphic,
    ContainerGraphic,
    ListRsume,
    TitleTransactions
} from './styles';

export function Home() {
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date())
    const [isOpen, setIsOpen] = useState(false)
    const [dateFormated, setDateFormated] = useState(Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date))
    const [totalBalance, setTotalBalance] = useState(0)
    const [resumes, setResumes] = useState<IResumeCategory[]>([])
    const [dateBalance, setDateBalance] = useState('01/08/2023')

    function onChange(event: DateTimePickerEvent, selectedDate: Date) {
        if (event.type === 'set') {
            const currentDate = selectedDate
            setDate(currentDate);
            if (Platform.OS !== 'web') {
                showDatepicker()
                setDate(currentDate);
            }
        } else {
            showDatepicker()
        }
    };

    const showDatepicker = () => {
        setIsOpen(!isOpen)
    };

    function handleListBalance() {
        navigation.navigate('listbalance')
    }

    function handleNewBalance() {
        navigation.navigate('balance')
    }

    function resumeTotalBalance() {
        let incomeBalance = 0
        let outcomeBalance = 0
        Balances.map(balance => {
            if (balance.typebalance === 'income') {
                incomeBalance = incomeBalance + balance.price
            } else {
                outcomeBalance = outcomeBalance + balance.price
            }
        })
        let totBalance = incomeBalance - outcomeBalance
        return (totBalance)
    }

    function resumeBalancesCategory(dateBalance: string) {
        let totCategories = 0;
        let sumCategory = 0;
        let arrBalanceCategories: IResumeCategory[] = []
        Categories.map(category => {
            sumCategory = 0
            const dataBalance = Balances
                .filter(balance => balance.datebalance === dateBalance)
                .filter(balance => balance.category === category.id)
            dataBalance.map(data => {
                sumCategory = sumCategory + data.price
            })
            totCategories = totCategories + sumCategory
            const newData = {
                idcategory: category.id,
                iconcategory: category.icon,
                namecategory: category.name,
                colorcategory: category.color,
                balancecategory: sumCategory,
                datebalance: dateBalance
            }
            arrBalanceCategories.push(newData)
            setTotalBalance(totCategories)
        })
        return arrBalanceCategories
    }

    useEffect(() => {
        setResumes(resumeBalancesCategory(dateBalance))
    }, [dateBalance])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <GroupButtonsHeader>
                    <ButtonNavigate onPress={handleListBalance}>
                        <ListBalances size={32} />
                    </ButtonNavigate>

                    <GroupInput>
                        <TextInput
                            placeholder={dateBalance}
                            id='dateBalance'
                            value={dateBalance}
                            onChangeText={setDateBalance}
                            keyboardType='numeric'
                            style={{
                                backgroundColor: '#eee',
                                padding: 10,
                                height: 40,
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: '#aaa',
                                textAlign: 'center'
                            }}
                        />
                        <TouchableOpacity onPress={showDatepicker}>
                            <IconDate />
                        </TouchableOpacity>
                        {isOpen && (
                            <DateTimePicker
                                display='spinner'
                                value={date}
                                mode='date'
                                onChange={(event) => onChange(event, date)}
                            />
                        )}
                    </GroupInput>

                    <ButtonNavigate onPress={handleNewBalance}>
                        <NewBalances size={32} />
                    </ButtonNavigate>
                </GroupButtonsHeader>

                <GroupGraphic>
                    <ResumeGraphic>
                        <TextResumeGraphic>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(resumeTotalBalance())}
                        </TextResumeGraphic>
                        <SubTextResumeGraphic>Total Balanço</SubTextResumeGraphic>
                        <SubTextResumeGraphic>(Geral)</SubTextResumeGraphic>
                    </ResumeGraphic>
                    <ContainerGraphic>
                        <Graphic resumesCategory={resumes} />
                    </ContainerGraphic>
                </GroupGraphic>

                <ListRsume>
                    <TitleTransactions>RESUMO DO DIA {dateBalance}</TitleTransactions>
                    <FlatList
                        data={resumes}
                        keyExtractor={item => item.idcategory.toString()}
                        renderItem={({ item }) => (
                            <ResumeCategory balanceCategory={item} />
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </ListRsume>
            </Container>
        </TouchableWithoutFeedback>
    )
}
