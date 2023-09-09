import { useState } from 'react';

import { ICategory } from '@utils/interfaces';
import { Categories } from '@utils/database';

import { 
    Container,
    ItemSelectView,
    SelectText
 } from './styles';

 type Props = {
    list: ICategory[];
    setValue: Function;
    setLabel: Function;
    isModalVisible: boolean;
    setIsModalVisible: Function;
 }

export function Select({ list, setValue, setLabel, isModalVisible, setIsModalVisible }: Props) {
    const [modalVisible, setModalVisible] = useState(isModalVisible);
    const [isSelected, setIsSelected] = useState(false);

    function handleSelectButton(id: number) {
        let nameCategory = Categories.find(category => category.id === id);
        if (nameCategory) {
            setLabel(nameCategory.name) 
            setValue(nameCategory.id)
        } else {
            setValue(0)
            setLabel('Selecione a Categoria')
        }
        setIsSelected(!isSelected);
        setIsModalVisible(!modalVisible);
    }

    return (
        <Container>
            {list.map(l => (
                <ItemSelectView 
                    key={l.id} 
                    isActive={isSelected} 
                    onPress={()=>handleSelectButton(l.id)}
                >
                    <SelectText>{l.name}</SelectText>
                </ItemSelectView>
            ))}
        </Container>
    )
}
