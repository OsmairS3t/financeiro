import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';

import { Input } from '@components/Forms/Input';
import { Button } from '@components/Forms/Button';

import {
    Container,
    HeaderSignIn,
    Logo,
    Title,
    Form,
    TextError,
    TextNewReg,
    BtnSocial,
    IconBtnSocial,
    TextBtnSocial
} from './styles';

type SignInProps = {
    email: string;
    password: string;
}
const schema = Yup.object().shape({
    email: Yup.string().required('O e-mail é necessária.'),
    password: Yup.string().required('A senha é necessária')
})

export function SignIn() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { handleSubmit, control, reset, formState: { errors } } = useForm<SignInProps>({
        resolver: yupResolver(schema)
    })

    function submitLogIn(formData: SignInProps) {
        console.log(formData)
    }

    async function storeData(user: string) {
        try {
            await AsyncStorage.setItem('@ljf_user', user);
        } catch (error) {
            console.log('Não foi possível salvar usuario.')
        }
        navigation.navigate('home')
    }

    function sendHome() {
        navigation.navigate('home')
    }

    function handleLoginSocial() {
        //Alert.alert('Você está logado')
        navigation.navigate('home')
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderSignIn>
                    <Logo source={require('@assets/logotipo.png')} />
                    <Title>TESOURARIA</Title>
                </HeaderSignIn>

                <Form>
                    <Controller
                        control={control}
                        name='email'
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                placeholder='E-mail'
                                value={email}
                                onChangeText={setEmail}
                                style={{ width: 320 }}
                            />
                        )}
                    />
                    {errors.email && <TextError>This is required.</TextError>}

                    <Controller
                        control={control}
                        name='password'
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                placeholder='Senha'
                                value={password}
                                onChangeText={setPassword}
                                style={{ width: 320 }}
                            />
                        )}
                    />
                    {errors.password && <TextError>This is required.</TextError>}

                    <Button
                        title="Entrar"
                        onPress={()=>{storeData('Osmair')}}
                    />

                    <TextNewReg>Não tenho cadastro</TextNewReg>
                    
                    <BtnSocial onPress={handleLoginSocial}>
                        <IconBtnSocial source={require('@assets/google.png')} />
                        <TextBtnSocial>
                            Entre com Google
                        </TextBtnSocial>
                    </BtnSocial>
                </Form>
            </Container>
        </SafeAreaView>
    )
}
