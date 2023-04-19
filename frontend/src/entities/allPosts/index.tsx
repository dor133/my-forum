import { Stack } from '../../core/Stack'
import { Text } from '../../core/Text'
import { useGetPostsQuery } from '../../store/rtk/posts'

export function AllPosts() {
    const { data } = useGetPostsQuery()

    return (
        <>
            <Stack>
                <Text variant="subtitle">Tous les posts</Text>
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
