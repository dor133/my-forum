import { Link } from 'react-router-dom'
import { Button } from '../../core/Button'
import { Group } from '../../core/Group'
import { Stack } from '../../core/Stack'
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
                    {!payload ? (
                        <Link to="/login">
                            <Button size="lg">Se connecter</Button>
                        </Link>
                    ) : (
                        <Stack>
                            <Link to="/profile">
                                <Button size="lg">Mon profil</Button>
                            </Link>
                            <Button size="lg" onClick={handleClick}>
                                Se déconnecter
                            </Button>
                        </Stack>
                    )}
                </Text>
            </Group>

            {payload && <Text variant="paragraph">Bienvenue {payload.username} !</Text>}
        </>
    )
}
