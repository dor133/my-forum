import { useParams } from 'react-router-dom'
import { useGetPostQuery } from '../../store/rtk/posts'
import { Card } from '../../core/Card'
import { Text } from '../../core/Text'
import { Stack } from '../../core/Stack'
import { useGetCommentsQuery, useDeleteCommentMutation } from '../../store/rtk/comments'
import { NewComment } from '../newComment'
import useAuthStore from '../../store/auth/auth.store'
import { Button } from '../../core/Button'
import { Group } from '../../core/Group'

export function Post() {
    const { id } = useParams()
    const { payload } = useAuthStore()
    const { data: post, isError: errorPost, isLoading: isPostLoading } = useGetPostQuery(id!)
    const { data: comments, isError: errorComments, isLoading: isCommentsLoading } = useGetCommentsQuery(id!)
    const [deleteComment] = useDeleteCommentMutation()
    const errors = [errorPost, errorComments]
    const isLoading = [isPostLoading, isCommentsLoading]
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
                        <Text variant="paragraph">{post.text}</Text>
                    </Card>

                    <Card id="comments">
                        <Stack spacing={4}>
                            <Text variant="subtitle">Commentaires ({comments?.length})</Text>

                            <NewComment />

                            {haveComments ? (
                                comments?.map((comment) => (
                                    <div key={comment._id} className="border-t border-gray-200">
                                        <Group>
                                            <Text variant="label">
                                                De{' '}
                                                <span className="italic">
                                                    {comment.author.username}
                                                    {payload && payload.sub === comment.author._id ? ' (vous)' : ''}
                                                </span>{' '}
                                                le
                                                <span className="italic">{new Date(comment.createdDate).toLocaleDateString()}</span>
                                            </Text>
                                            {payload && payload.sub === comment.author._id ? (
                                                <Button
                                                    size="xs"
                                                    color="red"
                                                    type="submit"
                                                    onClick={() => {
                                                        deleteComment({ id: comment._id, postId: id })
                                                    }}
                                                >
                                                    Supprimer
                                                </Button>
                                            ) : null}
                                        </Group>
                                        <Text variant="paragraph">{comment.text}</Text>
                                    </div>
                                ))
                            ) : (
                                <Text variant="label">Pas de commentaires</Text>
                            )}
                        </Stack>
                    </Card>
                </>
            ) : null}
        </div>
    )
}
