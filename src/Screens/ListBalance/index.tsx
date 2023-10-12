import { useEffect, useState } from 'react';
import {Text} from 'react-native'
import { ASYNCSTORAGE_KEY_BALANCES } from '@env'
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
    ButtonInputDate,
    GroupSwitch,
    TextSwitch
} from './styles';
import Header from '@components/Header';

export function ListBalance() {
    const navigation = useNavigation();
    const keyBalance = ASYNCSTORAGE_KEY_BALANCES;
    const [typeTransformed, setTypeTransformed] = useState('Entradas')
    const [isEnabled, setIsEnabled] = useState(false);
    const [type, setType] = useState<string>('income')
    const [balances, setBalances] = useState<IBalance[]>([])
    const [dateBalance, setDateBalance] = useState('')
    const [date, setDate] = useState<Date>(new Date())
    const [isOpen, setIsOpen] = useState(false)

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
   
    function onChange(selectedDate: Date) {
        const currentDate = selectedDate
        setDate(currentDate);
        if (Platform.OS !== 'web') {
            showDatepicker()
            setDate(currentDate);
            setDateBalance(Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).format(currentDate))
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
                    <Highlight onPress={()=>{navigation.goBack()}} title="Listar Lançamentos" />
                    <GroupHeader>
                        <ButtonInputDate onPress={showDatepicker}>
                            <TextInput
                                placeholder='Selecione a data'
                                id='dateBalance'
                                value={dateBalance}
                                keyboardType='numeric'
                                editable={false}
                                onPressIn={showDatepicker}
                                style={{
                                    padding: 10,
                                    color: '#000',
                                    height: 40,
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    borderColor: '#aaa',
                                    textAlign: 'center'
                                }}
                            />
                        </ButtonInputDate>
                        {isOpen &&
                            <DateTimePicker 
                                mode='date'
                                display='spinner'
                                value={date}
                                onChange={() => onChange(date)}
                            />
                        }

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

