import { useState } from 'react'
import { Button } from '../../../core/Button'
import { Card } from '../../../core/Card'
import { Group } from '../../../core/Group'
import { Stack } from '../../../core/Stack'
import { Text } from '../../../core/Text'
import { NewComment } from '../newComment'
import useAuthStore from '../../../store/auth/auth.store'
import { useDeleteCommentMutation, useGetCommentsQuery } from '../../../store/rtk/comments'
import { useParams } from 'react-router-dom'
import { Comment } from '../comment'

export function AllComments() {
    const { id } = useParams()
    const { payload } = useAuthStore()
    const { data: comments, isError: errorComments, isLoading: isCommentsLoading } = useGetCommentsQuery(id!)
    const [deleteComment] = useDeleteCommentMutation()

    const haveComments = comments ? comments.length > 0 : false

    // const [liked, setLiked] = useState(false)

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
                            <Comment _id={comment._id} author={comment.author} createdDate={comment.createdDate} postId={comment.postId} text={comment.text} />
                            // <div key={comment._id} className="border-t border-gray-200">
                            //     <Group>
                            //         <Text variant="label">
                            //             De{' '}
                            //             <span className="italic">
                            //                 {comment.author.username}
                            //                 {payload && payload.sub === comment.author._id ? ' (vous)' : ''}
                            //             </span>{' '}
                            //             le <span className="italic">{new Date(comment.createdDate).toLocaleDateString()}</span>
                            //         </Text>
                            //         {payload && payload.sub === comment.author._id ? (
                            //             <Button
                            //                 size="xs"
                            //                 color="red" id={id}
                            //                 type="submit"
                            //                 onClick={() => {
                            //                     deleteComment({ id: comment._id, postId: id })
                            //                 }}
                            //             >
                            //                 Supprimer
                            //             </Button>
                            //         ) : null}
                            //     </Group>

                            //     <div className="flex justify-between">
                            //         <Text variant="paragraph" className="whitespace-pre-line">
                            //             {comment.text}
                            //         </Text>

                            //         {liked ? (
                            //             <button onClick={() => setLiked(false)}>
                            //                 <svg className="text-red-400 w-5 h-auto fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            //                     <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                            //                 </svg>
                            //             </button>
                            //         ) : (
                            //             <button onClick={() => setLiked(true)}>
                            //                 <svg className="text-red-400 w-5 h-auto fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            //                     <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
                            //                 </svg>
                            //             </button>
                            //         )}
                            //     </div>
                            // </div>
                        ))
                    ) : (
                        <Text variant="label">Pas de commentaires</Text>
                    )}
                </Stack>
            )}
        </Card>
    )
}
