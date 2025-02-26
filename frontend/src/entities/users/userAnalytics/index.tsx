import { Text } from '../../../core/Text'
import useAuthStore from '../../../store/auth/auth.store'
import { useGetLastPostsAnalyticsQuery, useGetUserLastPostsAnalyticsQuery, useGetUserLastLikesAnalyticsQuery } from '../../../store/rtk/posts'
import { useGetUserCommentsQuery, useGetUserPostsQuery } from '../../../store/rtk/users'
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'

export function UserAnalytics() {
    const { payload } = useAuthStore()
    const { data: userPosts, isError: userPostsError, isLoading: userPostsLoading } = useGetUserPostsQuery(payload!.sub)
    const { data: userComments, isError: userCommentsError, isLoading: userCommentsLoading } = useGetUserCommentsQuery(payload!.sub)
    const { data: nbLastPosts, isError: nbLastPostsError, isLoading: nbLastPostsLoading } = useGetLastPostsAnalyticsQuery()
    const { data: nbUserLastPosts, isError: nbUserLastPostsError, isLoading: nbUserLastPostsLoading } = useGetUserLastPostsAnalyticsQuery()
    const { data: nbUserLastLikes, isError: nbUserLastLikesError, isLoading: nbUserLastLikesLoading } = useGetUserLastLikesAnalyticsQuery()

    const postData = [
        {
            name: 'La semaine passée',
            'Nombre de posts': nbLastPosts?.lastWeekCount,
            'Mes posts': nbUserLastPosts?.lastWeekCount,
        },
        {
            name: 'Il y a une semaine',
            'Nombre de posts': nbLastPosts?.lastWeek2Count,
            'Mes posts': nbUserLastPosts?.lastWeek2Count,
        },
        {
            name: 'Il y a deux semaines',
            'Nombre de posts': nbLastPosts?.lastWeek3Count,
            'Mes posts': nbUserLastPosts?.lastWeek3Count,
        },
        {
            name: 'Il y a trois semaines',
            'Nombre de posts': nbLastPosts?.lastWeek4Count,
            'Mes posts': nbUserLastPosts?.lastWeek4Count,
        },
    ]

    const likeData = [
        {
            name: 'La semaine passée',
            'Nombre de likes': nbUserLastLikes?.lastWeekCount,
        },
        {
            name: 'Il y a une semaine',
            'Nombre de likes': nbUserLastLikes?.lastWeek2Count,
        },
        {
            name: 'Il y a deux semaines',
            'Nombre de likes': nbUserLastLikes?.lastWeek3Count,
        },
        {
            name: 'Il y a trois semaines',
            'Nombre de likes': nbUserLastLikes?.lastWeek4Count,
        },
    ]

    return (
        <>
            <Text variant="subtitle" className="pb-1">
                Mes statistiques
            </Text>
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
                </>
            )}

            <Text variant="subtitle" className="pt-5">
                Nombre de posts sur les 4 dernières semaines
            </Text>
            {nbLastPostsError && nbUserLastPostsError ? (
                <div>Une erreur est survenue</div>
            ) : nbLastPostsLoading && nbUserLastPostsLoading ? (
                <div>Loading...</div>
            ) : (
                <ResponsiveContainer height={500} width="70%">
                    <BarChart width={500} height={300} data={postData} margin={{ top: 10, right: 0, left: 20, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Mes posts" fill="#82ca9d" />
                        <Bar dataKey="Nombre de posts" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            )}

            <Text variant="subtitle" className="pt-5">
                Nombre de likes sur mes posts les 4 dernières semaines
            </Text>
            {nbUserLastLikesError ? (
                <div>Une erreur est survenue</div>
            ) : nbUserLastLikesLoading ? (
                <div>Loading...</div>
            ) : (
                <ResponsiveContainer height={500} width="70%">
                    <BarChart width={500} height={300} data={likeData} margin={{ top: 10, right: 0, left: 20, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Nombre de likes" fill="#FFAFDF" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </>
    )
}
