import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '@components/Forms/Input';
import { Button } from '@components/Forms/Button';

import {
    Container,
    Logo,
    Title,
    Form,
    TextButton,
    TextError
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
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { handleSubmit, control, reset, formState: { errors } } = useForm<SignInProps>({
        resolver: yupResolver(schema)
    })

    function submitLogIn(formData: SignInProps) {
        console.log(formData)
    }

    return (
        <Container>
            <Logo source={require('@assets/logotipo.png')} />
            <Title>TESOURARIA</Title>
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
                    onPress={handleSubmit(submitLogIn)}
                />
            </Form>
        </Container>
    )
}
