import { Card } from '../../core/Card'
import { Center } from '../../core/Center'
import { Stack } from '../../core/Stack'
import { Text } from '../../core/Text'
import useAuthStore from '../../store/auth/auth.store'
import { useGetUserQuery, useGetUserPostsQuery, useGetUserNbCommentsQuery } from '../../store/rtk/users'

export function Profile() {
    const { payload } = useAuthStore()
    const { data: user } = useGetUserQuery(payload!.sub)
    const { data: posts } = useGetUserPostsQuery(payload!.sub)
    const { data: nbComments } = useGetUserNbCommentsQuery(payload!.sub)
    const userDate = new Date(user?.createdDate!)

    return (
        <Card>
            <Center>
                <img width="128" alt="Default pfp" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/128px-Default_pfp.svg.png" />
            </Center>

            <Center>
                <Text variant="title">{payload?.username}</Text>
            </Center>

            <Center>
                <Text variant="label">Membre depuis le {userDate.toLocaleDateString()}</Text>
            </Center>

            <Stack>
                <Text variant="paragraph">
                    Nombre de posts : <span className="font-bold">{posts?.length}</span>
                </Text>
                <Text variant="paragraph">
                    Nombre de commentaires : <span className="font-bold">{nbComments}</span>
                </Text>

                <div className="border-t border-gray-200 py-1.5">
                    <Text variant="subtitle">Mes posts</Text>
                    <ul className="list-disc list-inside">
                        {posts?.map((post) => (
                            <li key={post._id}>
                                <a href={`/posts/${post._id}`} className="text-base leading-7 text-gray-700">
                                    {post.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </Stack>
        </Card>
    )
}
