import { useEffect, useState } from 'react';
import { Platform, Switch, TouchableWithoutFeedback, Image, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Highlight from '@components/Highlight';
import { Select } from '@components/Forms/Select';
import { FormDataProps, InputForm } from '@components/Forms/InputForm';
import { Button } from '@components/Forms/Button';
import { Categories } from '@utils/database';

import {
    Container,
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
    BtnImageText,
    TextButton
} from './styles';

const schema = Yup.object().shape({
    description: Yup.string().required('A descrição é necessária.'),
    price: Yup.number().required('O valor é necesário')
})

export function Balance() {
    const navigation = useNavigation();
    //form's variables
    const [idCategory, setIdCategory] = useState(0)
    const [category, setCategory] = useState('Selecione a Categoria')
    const [description, setDescription] = useState('')
    const [typeBalance, setTypeBalance] = useState<string>('income')
    const [price, setPrice] = useState(0)
    const [dateBalance, setDateBalance] = useState('')
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

    async function LoadImage() {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (status !== 'granted') {
                alert('Permission denied!')
            }
        }
    }

    const PickImageLibrary = async () => {
        LoadImage();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        console.log(result)
        if (!result.canceled) {
            setImgComprove(result.assets[0].uri)
        }
    }

    const PickImageCamera = async () => {
        LoadImage();
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
        const data = {
            id: 0,
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Form>
                    <Highlight onPress={handleBack} title='Incluir Lançamentos' />
                    <ButtonSelectOpen
                        onPress={() => setModalVisible(true)}>
                        <TextButtonSelectOpen isEmpty={isSelectEmpty}>
                            {category}
                        </TextButtonSelectOpen>
                    </ButtonSelectOpen>

                    <InputForm
                        name='description'
                        control={control}
                        error={errors.description && errors.description.message}
                        placeholder='Descrição'
                        autoCapitalize='characters'
                        autoCorrect={false}
                    />
                    <InputForm
                        name='price'
                        control={control}
                        error={errors.price && errors.price.message}
                        placeholder='Valor'
                        autoCapitalize='characters'
                        keyboardType='numeric'
                    />
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
                            <BtnImage onPress={PickImageLibrary}>
                                <BtnImageText>Biblioteca</BtnImageText>
                            </BtnImage>
                            <BtnImage onPress={PickImageCamera}>
                                <BtnImageText>Câmera</BtnImageText>
                            </BtnImage>
                        </GroupButton>
                        <Image source={{ uri: imgComprove }} style={{
                            borderWidth: 1,
                            borderColor: '#bbb',
                            width: 260,
                            height: 350
                        }} />
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
                    <Button onPress={handleSubmit(handleSubmitBalance)}>
                        <TextButton>Incluir</TextButton>
                    </Button>
                </ContainerButton>
            </Container>
        </TouchableWithoutFeedback>
    )
}

