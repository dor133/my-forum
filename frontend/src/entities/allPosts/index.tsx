import { Stack } from '../../core/Stack'
import { Text } from '../../core/Text'

export function AllPosts() {
    return (
        <>
            <Stack>
                <Text variant="subtitle">Tous les posts</Text>
                <Text variant="paragraph">
                    <ul className="list-disc list-inside">
                        <li>Post 1</li>
                        <li>Post 2</li>
                        <li>Post 3</li>
                    </ul>
                </Text>
            </Stack>
        </>
    )
}
