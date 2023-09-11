import { useState, useEffect } from 'react';
import { FlatList, Button, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
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
    const [mode, setMode] = useState('date');
    const [isOpen, setIsOpen] = useState(false)

    const [totalBalance, setTotalBalance] = useState(0)
    const [resumes, setResumes] = useState<IResumeCategory[]>([])
    const [dateBalance, setDateBalance] = useState('01/08/2023')

    const onChange = (selectedDate:Date) => {
        const currentDate = selectedDate;
        setIsOpen(false)
        setDate(currentDate);
    };
    
    const showDatepicker = () => {
        setMode('date');
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
        <Container>
            <GroupButtonsHeader>
                <ButtonNavigate onPress={handleListBalance}>
                    <ListBalances size={30} />
                </ButtonNavigate>

                <GroupInput>
                    <Button title="Open" onPress={showDatepicker} />
                    <Text>selected: {date.toLocaleString()}</Text>
                    {isOpen && (
                        <DateTimePicker
                            value={date}
                            mode='date'
                            onChange={onChange}
                        />
                    )}
                </GroupInput>
                <ButtonNavigate onPress={handleNewBalance}>
                    <NewBalances size={30} />
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
    )
}
