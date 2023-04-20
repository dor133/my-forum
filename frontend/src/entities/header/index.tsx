import { Button } from '../../core/Button'
import { Group } from '../../core/Group'
import { Text } from '../../core/Text'
import useAuthStore from '../../store/auth/auth.store'

export function Header() {
    const { payload } = useAuthStore()

    const handleClick = () => {
        useAuthStore.getState().logOut()
    }

    return (
        <>
            <Group spacing={6} justify="between" className="items-center">
                <Text variant="title">My forum</Text>
                <Text variant="paragraph">
                    {/* {!payload?.username ? (
                        <a href="/login">
                            <Button size="lg">Se connecter</Button>
                        </a>
                    ) : (
                        <a href="/">
                            <Button size="lg" onClick={handleClick}>
                                Se déconnecter
                            </Button>
                        </a>
                    )} */}
                    <a href="/login">
                        <Button size="lg">Se connecter</Button>
                    </a>
                </Text>
            </Group>

            {payload?.username && <Text variant="paragraph">Bienvenue {payload.username} !</Text>}
        </>
    )
}
