import { Button } from '../../core/Button'
import { Group } from '../../core/Group'
import { Stack } from '../../core/Stack'
import { Text } from '../../core/Text'
import useAuthStore from '../../store/auth/auth.store'
import { useGetPostsQuery } from '../../store/rtk/posts'

export function AllPosts() {
    const { data } = useGetPostsQuery()
    const { payload } = useAuthStore()

    return (
        <>
            <Stack>
                <Group justify="between">
                    <Text variant="subtitle">Tous les posts</Text>
                    {payload?.username && (
                        <a href="/posts/new">
                            <Button size="lg">Créér un post</Button>
                        </a>
                    )}
                </Group>
                <Text variant="paragraph">
                    <ul className="list-disc list-inside">
                        {data?.map((post) => (
                            <li key={post._id}>
                                <a href={`/posts/${post._id}`}>{post.title}</a>
                            </li>
                        ))}
                    </ul>
                </Text>
            </Stack>
        </>
    )
}
