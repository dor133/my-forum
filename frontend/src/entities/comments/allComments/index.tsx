import { Card } from '../../../core/Card'
import { Stack } from '../../../core/Stack'
import { Text } from '../../../core/Text'
import { NewComment } from '../newComment'
import { useGetCommentsQuery } from '../../../store/rtk/comments'
import { useParams } from 'react-router-dom'
import { Comment } from '../comment'

export function AllComments() {
    const { id } = useParams()
    const { data: comments, isError: errorComments, isLoading: isCommentsLoading } = useGetCommentsQuery(id!)

    const haveComments = comments ? comments.length > 0 : false

    return (
        <Card id="comments">
            {errorComments ? (
                <div>Une erreur est survenue</div>
            ) : isCommentsLoading ? (
                <div>Loading...</div>
            ) : (
                <Stack spacing={4}>
                    <Text variant="subtitle">Commentaires ({comments?.length})</Text>

                    <NewComment />

                    {haveComments ? (
                        comments?.map((comment) => (
                            <div key={comment._id}>
                                <Comment
                                    _id={comment._id}
                                    author={comment.author}
                                    createdDate={comment.createdDate}
                                    postId={comment.postId}
                                    text={comment.text}
                                    likes={comment.likes}
                                />
                            </div>
                        ))
                    ) : (
                        <Text variant="label">Pas de commentaires</Text>
                    )}
                </Stack>
            )}
        </Card>
    )
}
