import { useParams } from 'react-router-dom'
import { useGetPostQuery } from '../../store/rtk/posts'
import { Card } from '../../core/Card'
import { Text } from '../../core/Text'
import { Stack } from '../../core/Stack'
import { useGetUserQuery } from '../../store/rtk/users'

export function Post() {
    const { id } = useParams()
    const { data: post } = useGetPostQuery(id!)
    // fool method to get the author username
    const { data: author } = useGetUserQuery(post?.authorId!)

    const date = new Date(post?.createdDate!)

    return (
        <div className="space-y-4">
            <Card>
                <Stack spacing={4}>
                    <Text variant="title">{post?.title}</Text>
                    <Text variant="label">
                        Post créé le <span className="italic">{date.toLocaleDateString()}</span> par <span className="italic">{author?.username}</span>
                    </Text>
                </Stack>
            </Card>

            <Card>
                <Text variant="paragraph">{post?.text}</Text>
            </Card>
        </div>
    )
}
