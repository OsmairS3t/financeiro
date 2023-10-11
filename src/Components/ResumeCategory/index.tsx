import { useNavigation } from '@react-navigation/native';
import {
    Container,
    IconTransaction,
    TextTransaction,
    PriceTransaction
} from './styles'

interface TransactionProps {
    balanceCategory: {
        idcategory: number;
        iconcategory: string | any;
        namecategory: string;
        colorcategory: string;
        balancecategory: number;
        datebalance: string;
    }
}

export default function ResumeCategory({ balanceCategory }: TransactionProps) {
    const navigation = useNavigation()

    function openDetail(id: number) {
        navigation.navigate('detailcategory', { idcategory: id })
    }
    return (
        <Container
            key={balanceCategory.idcategory}
            colorCategory={balanceCategory.colorcategory}
            onPress={() => openDetail(balanceCategory.idcategory)}
        >
            <IconTransaction name={balanceCategory.iconcategory} />
            <TextTransaction>{balanceCategory.namecategory}</TextTransaction>
            <PriceTransaction>
                {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(balanceCategory.balancecategory)}
            </PriceTransaction>
        </Container>
    )
}
