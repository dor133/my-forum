import { useParams } from 'react-router-dom'
import { useGetPostQuery } from '../../store/rtk/posts'
import { Card } from '../../core/Card'
import { Text } from '../../core/Text'
import { Stack } from '../../core/Stack'
import { useGetUserQuery } from '../../store/rtk/users'
import { useGetCommentsQuery } from '../../store/rtk/comments'

export function Post() {
    const { id } = useParams()
    const { data: post, isError: errorPost, isLoading: isPostLoading } = useGetPostQuery(id!)
    const { data: author, isError: errorUser, isLoading: isUserLoading } = useGetUserQuery(post?.authorId!)
    const { data: comments, isError: errorComments, isLoading: isCommentsLoading } = useGetCommentsQuery(id!)
    const errors = [errorPost, errorUser, errorComments]
    const isLoading = [isPostLoading, isUserLoading, isCommentsLoading]
    const haveComments = comments ? comments.length > 0 : false
    const postDate = new Date(post?.createdDate!)

    return (
        <div className="space-y-4">
            {errors.includes(true) ? (
                <div>Une erreur est survenue</div>
            ) : isLoading.includes(true) ? (
                <div>Loading...</div>
            ) : post ? (
                <>
                    <Card>
                        <Stack spacing={4}>
                            <Text variant="title">{post?.title}</Text>
                            <Text variant="label">
                                Post créé le <span className="italic">{postDate.toLocaleDateString()}</span> par{' '}
                                <span className="italic">{author?.username}</span>
                            </Text>
                        </Stack>
                    </Card>

                    <Card>
                        <Text variant="paragraph">{post.text}</Text>
                    </Card>

                    <Card>
                        <Text variant="subtitle">Commentaires</Text>
                        {haveComments ? (
                            comments?.map((comment) => (
                                <div key={comment._id} className="border-t border-gray-200">
                                    <Text variant="label">
                                        De <span className="italic">{comment.author.username}</span> le{' '}
                                        <span className="italic">{new Date(comment.createdDate).toLocaleDateString()}</span>
                                    </Text>
                                    <Text variant="paragraph">{comment.text}</Text>
                                </div>
                            ))
                        ) : (
                            <Text variant="label" className="border-t border-gray-200">
                                Pas de commentaires
                            </Text>
                        )}
                    </Card>
                </>
            ) : null}
        </div>
    )
}
