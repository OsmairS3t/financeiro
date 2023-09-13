import { PressableProps } from 'react-native'

import { Container, Title } from './styles'

interface Props extends PressableProps {
  title?: string;
}

export function Button({ title, ...rest }: Props) {
  return (
    <Container {...rest}>
      {title && <Title>{title}</Title>}
    </Container>
  )
}