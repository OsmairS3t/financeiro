import { PressableProps } from 'react-native'

import { Container } from './styles'

interface Props extends PressableProps { }

export function Button({ ...rest }: Props) {
  return (
    <Container {...rest}>

    </Container>
  )
}