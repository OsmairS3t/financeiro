import { IBalance, ICategory } from '@utils/interfaces';
import {
    Container,
    LineColorIdentity,
    IconTransaction,
    TextTransaction,
    PriceTransaction
} from './styles'
import { Categories } from '@utils/database';
import { useEffect, useState } from 'react';

interface Props {
    balance: IBalance;
}

export default function Transaction({ balance }: Props) {
    const [color, setColor] = useState('#FFF')

    function searchColorCategory(id: number) {
        const colorCategory = Categories.find(category => category.id === id)
        colorCategory ? setColor(colorCategory.color) : setColor('#FFF')
    }

    useEffect(() => {
        searchColorCategory(balance.category)
    }, [])

    return (
        <Container key={balance.id} colorCategory={color}>
            <TextTransaction>{balance.datebalance}</TextTransaction>
            <TextTransaction>{balance.description}</TextTransaction>
            <PriceTransaction>
                {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(balance.price)}
            </PriceTransaction>
        </Container>
    )
}