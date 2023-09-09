import {
    Container,
    ButtonHighlightIcon,
    Icon,
    GroupTitle,
    Title
} from './styles'

interface HighlightProps {
    title: string;
    colorBG?: string;
    onPress: () => void;
}

export default function Highlight({ title, colorBG, onPress }: HighlightProps) {
    return (
        <Container colorBackground={colorBG}>
            <ButtonHighlightIcon onPress={onPress}>
                <Icon />
            </ButtonHighlightIcon>
            <GroupTitle>
                <Title>{title}</Title>
            </GroupTitle>
        </Container>
    )
}