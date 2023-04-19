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
    // fool method to get the author username and comments
    const { data: author, isError: errorUser, isLoading: isUserLoading } = useGetUserQuery(post?.authorId!)
    const { data: comments, isError: errorComments, isLoading: isCommentsLoading } = useGetCommentsQuery(id!)
    const errors = [errorPost, errorUser, errorComments]
    const isLoading = [isPostLoading, isUserLoading, isCommentsLoading]
    // errors.includes(true) ? console.log('error') : console.log('no error')
    // isLoading.includes(true) ? console.log('loading') : console.log('loaded')
    const haveComments = comments ? comments.length > 0 : false
    console.log(haveComments)
    const date = new Date(post?.createdDate!)

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
                                Post créé le <span className="italic">{date.toLocaleDateString()}</span> par <span className="italic">{author?.username}</span>
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
                                    <Text variant="paragraph">{comment.text}</Text>
                                </div>
                            ))
                        ) : (
                            <Text variant="paragraph">Pas de commentaires</Text>
                        )}
                    </Card>
                </>
            ) : null}
        </div>
    )
}
