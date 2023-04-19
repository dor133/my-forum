import { Button } from '../../core/Button'
import { Group } from '../../core/Group'
import { Text } from '../../core/Text'
import useAuthStore from '../../store/auth/auth.store'

export function Header() {
    const { access_token } = useAuthStore()
    console.log(access_token)
    return (
        <>
            <Group spacing={6} justify="between" className="items-center">
                <Text variant="title">My forum</Text>
                <Text variant="paragraph">
                    <a href="/login">
                        <Button size="lg">Se connecter</Button>
                    </a>
                </Text>
            </Group>

            {access_token && <Text variant="paragraph">Bienvenue !</Text>}
        </>
    )
}
