import { Group } from '../../core/Group'
import { Text } from '../../core/Text'

export function Header() {
    return (
        <>
            <Group spacing={6} justify="between" className="items-center">
                <Text variant="title">My forum</Text>
                <Text variant="paragraph">
                    <a href="/tuto">Log in</a>
                </Text>
            </Group>

            {/* If user connected => */}
            <Text variant="paragraph">Bienvenue (user) !</Text>
        </>
    )
}
