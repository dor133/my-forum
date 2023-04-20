import { Card } from '../../core/Card'
import { Center } from '../../core/Center'
import { Group } from '../../core/Group'
import { Stack } from '../../core/Stack'
import { Text } from '../../core/Text'
import useAuthStore from '../../store/auth/auth.store'

export function Profile() {
    const { payload } = useAuthStore()

    return (
        <Card>
            <Center>
                <img width="128" alt="Default pfp" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/128px-Default_pfp.svg.png" />
            </Center>

            <Center>
                <Text variant="title">{payload?.username}</Text>
            </Center>
        </Card>
    )
}
