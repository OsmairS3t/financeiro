import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IBalance } from '@utils/interfaces';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Highlight from '@components/Highlight';
import { 
    Platform,
    FlatList, 
    Switch, 
    TouchableOpacity,
    TextInput 
} from 'react-native'
import Transaction from '@components/Transaction';

import {
    Container,
    Content,
    GroupHeader,
    GroupInput,
    IconDate,
    GroupSwitch,
    TextSwitch
} from './styles';
import Header from '@components/Header';

export function ListBalance() {
    const keyBalance = '@LJF:Balances';
    const [typeTransformed, setTypeTransformed] = useState('Entradas')
    const [isEnabled, setIsEnabled] = useState(false);
    const [type, setType] = useState<string>('income')
    const [balances, setBalances] = useState<IBalance[]>([])
    const [dateBalance, setDateBalance] = useState('22/09/2023')
    const [date, setDate] = useState(new Date())
    const [isOpen, setIsOpen] = useState(false)
    const navigation = useNavigation();
    const [dateFormated, setDateFormated] = useState(Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date))

    function handleBack() {
        navigation.navigate('home')
    }

    function handleSwitch() {
        if (type === 'income') {
            setType('outcome')
            setIsEnabled(!isEnabled)
            setTypeTransformed('Saídas')
        } else {
            setType('income')
            setIsEnabled(!isEnabled)
            setTypeTransformed('Entradas')
        }
    }
    
    /*
        async function removeAll() {
            await AsyncStorage.removeItem(keyBalance)
        }
    */

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

    async function GetDataStorage(typeBalance: string) {
        try {
            const response = await AsyncStorage.getItem(keyBalance);
            const newBalanceData: IBalance[] = response ? JSON.parse(response) : [];
            
            setBalances(newBalanceData.filter(nb => nb.typebalance === typeBalance));
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }
  
    useEffect(() => {
        GetDataStorage(type)
    }, [type])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <Header />
                <Content>
                    <Highlight onPress={handleBack} title="Listar Lançamentos" />
                    <GroupHeader>
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
                        <GroupSwitch>
                            <TextSwitch>
                                {typeTransformed}
                            </TextSwitch>
                            <Switch
                                trackColor={{ false: '#792ec5', true: '#4b86eb' }}
                                thumbColor={isEnabled ? '#777' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={handleSwitch}
                                value={isEnabled}
                            />
                        </GroupSwitch>
                    </GroupHeader>
                    <FlatList
                        style={{ marginTop: 20 }}
                        data={balances}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <Transaction balance={item} />}
                    />
                </Content>
            </Container>
        </SafeAreaView>
    )
}

