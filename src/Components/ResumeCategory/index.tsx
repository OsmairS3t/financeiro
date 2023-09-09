import { useNavigation } from '@react-navigation/native';
import { ICategory } from '@utils/interfaces';
import {
    Container,
    LineColorIdentity,
    IconTransaction,
    TextTransaction,
    PriceTransaction
} from './styles'

interface TransactionProps {
    balanceCategory: {
        idcategory: number;
        iconcategory: string;
        namecategory: string;
        colorcategory: string;
        balancecategory: number;
        datebalance: string;
    }
}

export default function ResumeCategory({ balanceCategory }: TransactionProps) {
    const navigation = useNavigation()

    function openDetail(id: number, datecategory: string) {
        navigation.navigate('detailcategory', { idcategory: id, datecategory: datecategory })
    }

    return (
        <Container
            key={balanceCategory.idcategory}
            colorCategory={balanceCategory.colorcategory}
            onPress={() => openDetail(balanceCategory.idcategory, balanceCategory.datebalance)}
        >
            <IconTransaction  name={balanceCategory.iconcategory} />
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
