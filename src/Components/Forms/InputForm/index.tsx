import React from 'react';
import { TextInput ,TextInputProps } from 'react-native'
import { Controller, Control } from 'react-hook-form';

import { Container, Error } from './styles';
import { Input } from '../Input';

export interface FormDataProps{
  description: string;
  price: number;
}

interface Props extends TextInputProps {
  control: Control<FormDataProps>;
  name: 'description' | 'price';
  error?: string | undefined;
}

export function InputForm({
  control,
  name,
  error,
  ...rest
}: Props) {
  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: {onChange, value} }) => (
          <Input
            onChangeText={onChange}
            value={value as string}
            {...rest}
          />
        )}
      />
      {error && <Error>{ error }</Error>}
    </Container>
  )
}
