import { useState } from 'react'
import { Group } from '../../../core/Group'
import { Text } from '../../../core/Text'
import { Button } from '../../../core/Button'
import useAuthStore from '../../../store/auth/auth.store'
import { CommentQueryData } from '../../security/types'
import { useDeleteCommentMutation, useAddLikeMutation, useRemoveLikeMutation } from '../../../store/rtk/comments'
import { useParams } from 'react-router-dom'

export function Comment(commentData: CommentQueryData) {
    const { id } = useParams()
    const { payload } = useAuthStore()
    const [deleteComment] = useDeleteCommentMutation()
    const [addLike] = useAddLikeMutation()
    const [removeLike] = useRemoveLikeMutation()

    const [liked, setLiked] = useState(commentData?.likes.length === 0 ? false : true)

    const handleClickedLike = () => {
        if (liked) {
            setLiked(false)
            removeLike({ id: commentData._id, postId: id })
        } else {
            setLiked(true)
            addLike({ id: commentData._id, postId: id })
        }
    }

    return (
        <div className="border-t border-gray-200">
            <Group>
                <Text variant="label">
                    De{' '}
                    <span className="italic">
                        {commentData.author.username}
                        {payload && payload.sub === commentData.author._id ? ' (vous)' : ''}
                    </span>{' '}
                    le <span className="italic">{new Date(commentData.createdDate).toLocaleDateString()}</span>
                </Text>
                {payload && payload.sub === commentData.author._id ? (
                    <Button
                        size="xs"
                        color="red"
                        type="submit"
                        onClick={() => {
                            deleteComment({ id: commentData._id, postId: id })
                        }}
                    >
                        Supprimer
                    </Button>
                ) : null}
            </Group>

            <div className="flex justify-between">
                <Text variant="paragraph" className="whitespace-pre-line">
                    {commentData.text}
                </Text>

                {payload ? (
                    liked ? (
                        <button onClick={handleClickedLike}>
                            <svg className="text-red-400 w-5 h-auto fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                            </svg>
                        </button>
                    ) : (
                        <button onClick={handleClickedLike}>
                            <svg className="text-red-400 w-5 h-auto fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
                            </svg>
                        </button>
                    )
                ) : null}
            </div>
        </div>
    )
}
