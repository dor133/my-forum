import { useParams } from 'react-router-dom'
import { useGetPostQuery } from '../../../store/rtk/posts'
import { Card } from '../../../core/Card'
import { Text } from '../../../core/Text'
import { Stack } from '../../../core/Stack'
import { AllComments } from '../../comments/allComments'

export function Post() {
    const { id } = useParams()
    const { data: post, isError: errorPost, isLoading: isPostLoading } = useGetPostQuery(id!)
    const postDate = new Date(post?.createdDate!)

    return (
        <div className="space-y-4">
            {errorPost ? (
                <div>Une erreur est survenue</div>
            ) : isPostLoading ? (
                <div>Loading...</div>
            ) : post ? (
                <>
                    <Card id="head">
                        <Stack spacing={4}>
                            <Text variant="title">{post?.title}</Text>
                            <Text variant="label">
                                Post créé le <span className="italic">{postDate.toLocaleDateString()}</span> par{' '}
                                <span className="italic">{post.author.username}</span>
                            </Text>
                        </Stack>
                    </Card>

                    <Card id="content">
                        {/* .replace(/(?:\r\n|\r|\n)/g, '<br />') */}
                        <Text variant="paragraph" className="whitespace-pre-line">
                            {post.text}
                        </Text>
                    </Card>

                    <AllComments />
                </>
            ) : null}
        </div>
    )
}
