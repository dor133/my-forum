import { Button } from '../../core/Button'
import { Group } from '../../core/Group'
import { Text } from '../../core/Text'
import useAuthStore from '../../store/auth/auth.store'
import { useLoginMutation } from '../../store/rtk/auth'

export function Header() {
    return (
        <>
            <Group spacing={6} justify="between" className="items-center">
                <Text variant="title">My forum</Text>
                <Text variant="paragraph">
                    <a href="/tuto">
                        <Button size="lg">Log in</Button>
                    </a>
                </Text>
            </Group>

            {/* If user connected => */}
            <Text variant="paragraph">Bienvenue (user) !</Text>
        </>
    )
}
