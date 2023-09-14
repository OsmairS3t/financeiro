import { useEffect, useState } from 'react';
import { Platform, Switch, TouchableWithoutFeedback, Image, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Highlight from '@components/Highlight';
import { Select } from '@components/Forms/Select';
import { FormDataProps, InputForm } from '@components/Forms/InputForm';
import { Button } from '@components/Forms/Button';
import { Balances, Categories } from '@utils/database';
import { NewNumber } from '@utils/functions';

import {
    Container,
    Content,
    Form,
    ContainerButton,
    ButtonSelectOpen,
    TextButtonSelectOpen,
    ModalView,
    GroupSwitch,
    TextSwitch,
    GroupImage,
    GroupButton,
    BtnImage,
    IconCamera,
    IconImage,
    BoxInput,
    PhotoImage,
    ImgCapture,
    TextButton
} from './styles';
import Header from '@components/Header';

const schema = Yup.object().shape({
    description: Yup.string().required('A descrição é necessária.'),
    price: Yup.number().required('O valor é necesário')
})

export function Balance() {
    const navigation = useNavigation();
    const sequence = Balances.reduce(function (prev, current) {
        return (prev.id > current.id) ? prev : current
    })

    //form's variables
    const [idCategory, setIdCategory] = useState(0)
    const [category, setCategory] = useState('Selecione a Categoria')
    const [description, setDescription] = useState('')
    const [typeBalance, setTypeBalance] = useState<string>('income')
    const [price, setPrice] = useState(0)
    const [dateBalance, setDateBalance] = useState(Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(new Date()))
    const [imgComprove, setImgComprove] = useState<string>('/assets/farol.png')

    const [modalVisible, setModalVisible] = useState(false);
    const [typeTransformed, setTypeTransformed] = useState('Entrada')
    const [isEnabled, setIsEnabled] = useState(false);
    const [isSelectEmpty, setIsSelectEmpty] = useState(false);
    const { handleSubmit, control, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(schema)
    });

    function handleBack() {
        navigation.navigate('home')
    }

    function handleSwitch() {
        if (typeBalance === 'income') {
            setTypeBalance('outcome')
            setIsEnabled(!isEnabled)
            setTypeTransformed('Saída')
        } else {
            setTypeBalance('income')
            setIsEnabled(!isEnabled)
            setTypeTransformed('Entrada')
        }
    }

    useEffect(() => {
        if (idCategory !== 0) {
            setIsSelectEmpty(false)
        } else {
            setIsSelectEmpty(true)
        }
    }, [idCategory])

    // async function LoadImage() {
    //     if (Platform.OS !== 'web') {
    //         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    //         if (status !== 'granted') {
    //             alert('Permission denied!')
    //         }
    //     }
    // }

    const PickImageLibrary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [2, 4],
            quality: 1
        })
        console.log(result)
        if (!result.canceled) {
            setImgComprove(result.assets[0].uri)
        }
    }

    const PickImageCamera = async () => {
        //LoadImage();
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync()
        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }
        const result = await ImagePicker.launchCameraAsync();
        console.log(result)
        if (!result.canceled) {
            setImgComprove(result.assets[0].uri);
            console.log(result.assets[0].uri);
        }
    }

    function handleSubmitBalance(form: FormDataProps) {
        const sequencia = NewNumber(sequence.id)
        const data = {
            id: sequencia,
            category: idCategory,
            description: form.description,
            typebalance: typeBalance,
            price: form.price,
            datebalance: dateBalance,
            file: imgComprove
        }
        console.log(data)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header />
                    <Content>
                        <Highlight onPress={handleBack} title='Incluir Lançamentos' />

                        <Form>
                            <BoxInput size={100}>
                                <ButtonSelectOpen
                                    onPress={() => setModalVisible(true)}>
                                    <TextButtonSelectOpen isEmpty={isSelectEmpty}>
                                        {category}
                                    </TextButtonSelectOpen>
                                </ButtonSelectOpen>
                            </BoxInput>

                            <BoxInput size={100}>
                                <InputForm
                                    name='description'
                                    control={control}
                                    error={errors.description && errors.description.message}
                                    placeholder='Descrição'
                                    autoCapitalize='characters'
                                    autoCorrect={false}
                                />
                            </BoxInput>

                            <BoxInput size={50}>
                                <InputForm
                                    name='price'
                                    control={control}
                                    error={errors.price && errors.price.message}
                                    placeholder='Valor'
                                    autoCapitalize='characters'
                                    keyboardType='numeric'
                                />
                            </BoxInput>

                            <GroupSwitch>
                                <TextSwitch isBold={true}>Tipo de movimento:</TextSwitch>
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

                            <GroupImage>
                                <GroupButton>
                                    <TextSwitch isBold={true}>Incluir Comprovante:</TextSwitch>
                                    <BtnImage onPress={PickImageLibrary}>
                                        <IconImage />
                                    </BtnImage>
                                    <BtnImage onPress={PickImageCamera}>
                                        <IconCamera />
                                    </BtnImage>
                                </GroupButton>
                                <PhotoImage>
                                    <ImgCapture source={{ uri: imgComprove }} />
                                </PhotoImage>
                            </GroupImage>

                            <ModalView
                                animationType="fade"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    setModalVisible(!modalVisible);
                                }}>
                                <Select
                                    list={Categories}
                                    setValue={setIdCategory}
                                    setLabel={setCategory}
                                    isModalVisible={modalVisible}
                                    setIsModalVisible={setModalVisible}
                                />
                            </ModalView>
                        </Form>

                        <ContainerButton>
                            <Button
                                title='Incluir'
                                onPress={handleSubmit(handleSubmitBalance)}
                            />
                        </ContainerButton>
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

