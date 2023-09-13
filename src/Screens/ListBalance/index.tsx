import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { IBalance } from '@utils/interfaces';
import { Balances } from '@utils/database'
import Highlight from '@components/Highlight';
import { FlatList, Switch } from 'react-native'
import Transaction from '@components/Transaction';

import {
    Container,
    GroupSwitch,
    TextSwitch
} from './styles';

export function ListBalance() {
    const [typeTransformed, setTypeTransformed] = useState('Entradas')
    const [isEnabled, setIsEnabled] = useState(false);
    const [type, setType] = useState<string>('income')
    const [balances, setBalances] = useState<IBalance[]>([])
    const navigation = useNavigation();

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

    useEffect(() => {
        setBalances(Balances.filter(balance => balance.typebalance === type))
    }, [type])

    return (
        <Container>
            <Highlight onPress={handleBack} title="Listar Lançamentos" />
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
            <FlatList
                style={{ marginTop: 20 }}
                data={balances}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <Transaction balance={item} />}
            />
        </Container>
    )
}

