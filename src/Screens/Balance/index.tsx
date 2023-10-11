import { useEffect, useState } from 'react';
import {
    Platform,
    Switch,
    TouchableWithoutFeedback,
    Alert,
    Keyboard
} from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Highlight from '@components/Highlight';
import Header from '@components/Header';
import uuid from 'react-native-uuid';
import * as ImagePicker from 'expo-image-picker';

import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNCSTORAGE_KEY_BALANCES } from '@env'
import { Select } from '@components/Forms/Select';
import { FormDataProps, InputForm } from '@components/Forms/InputForm';
import { Button } from '@components/Forms/Button';
import { Categories } from '@utils/database';
import { IBalance } from '@utils/interfaces';

import {
    Container,
    Content,
    Form,
    ContainerButton,
    ButtonSelectOpen,
    TextButtonSelectOpen,
    IconButtonSelectOpen,
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

const schema = Yup.object().shape({
    description: Yup.string().required('A descrição é necessária.'),
    price: Yup.number().required('O valor é necesário')
})

export function Balance() {
    const keyBalance = ASYNCSTORAGE_KEY_BALANCES
    const navigation = useNavigation();
    const [balances, setBalances] = useState<IBalance[]>([])
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
    //settings variables
    const theme = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [typeTransformed, setTypeTransformed] = useState('Entrada')
    const [isEnabled, setIsEnabled] = useState(false);
    const [isSelectEmpty, setIsSelectEmpty] = useState(false);
    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataProps>({
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

    function LimpaDadosForm() {
        setCategory('Selecione a Categoria');
        setTypeBalance('income')
        handleSwitch()
        reset();
    }

    useEffect(() => {
        if (idCategory !== 0) {
            setIsSelectEmpty(false)
        } else {
            setIsSelectEmpty(true)
        }
    }, [idCategory])

    async function handleSubmitBalance(form: FormDataProps) {

        const dataBalance = {
            id: uuid.v4(),
            category: idCategory,
            description: form.description,
            typebalance: typeBalance,
            price: form.price,
            datebalance: dateBalance,
            file: imgComprove
        }

        try {
            const data = await AsyncStorage.getItem(keyBalance);
            const currentData = data ? JSON.parse(data) : [];
            const dataFormatted = [
                ...currentData,
                dataBalance
            ]
            await AsyncStorage.setItem(keyBalance, JSON.stringify(dataFormatted));
            Alert.alert('Lançamento cadastrado com sucesso!');
            //reset();
            LimpaDadosForm()
        } catch (error) {
            console.log(error);
            Alert.alert(`Não foi possivel salvar devido a ${error}`);
        }
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
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <TextButtonSelectOpen isEmpty={isSelectEmpty}>
                                        {category}
                                    </TextButtonSelectOpen>
                                    <IconButtonSelectOpen />
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
                                <Switch
                                    trackColor={{ false: theme.COLORS.SWITH_FALSE, true: theme.COLORS.SWITH_TRUE }}
                                    thumbColor={isEnabled ? theme.COLORS.SWITH_ENABLED : theme.COLORS.SWITH_DISABLED}
                                    ios_backgroundColor={theme.COLORS.SWITH_IOS}
                                    onValueChange={handleSwitch}
                                    value={isEnabled}
                                />
                                <TextSwitch>{typeTransformed}</TextSwitch>
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

