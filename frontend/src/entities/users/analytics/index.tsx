import { Text } from '../../../core/Text'
import useAuthStore from '../../../store/auth/auth.store'
import { useGetPostsQuery } from '../../../store/rtk/posts'
import { useGetUserCommentsQuery, useGetUserPostsQuery } from '../../../store/rtk/users'

export function Analytics() {
    const { payload } = useAuthStore()
    const { data: userPosts, isError: userPostsError, isLoading: userPostsLoading } = useGetUserPostsQuery(payload!.sub)
    const { data: userComments, isError: userCommentsError, isLoading: userCommentsLoading } = useGetUserCommentsQuery(payload!.sub)
    const { data: allPosts, isError: allPostsError, isLoading: allPostsLoading } = useGetPostsQuery()

    return (
        <>
            {userPostsError && userCommentsError ? (
                <div>Une erreur est survenue</div>
            ) : userPostsLoading && userCommentsLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <Text variant="paragraph">
                        Nombre de posts : <span className="font-bold">{userPosts?.length}</span>
                    </Text>
                    <Text variant="paragraph">
                        Nombre de commentaires : <span className="font-bold">{userComments?.length}</span>
                    </Text>

                    {allPostsError ? (
                        <div>Une erreur est survenue</div>
                    ) : allPostsLoading ? (
                        <div>Loading...</div>
                    ) : (
                        allPosts?.map((post) => (
                            <div key={post._id}>
                                <Text variant="paragraph">{post.title}</Text>
                            </div>
                        ))
                    )}
                </>
            )}
        </>
    )
}
