import { Button } from '../../core/Button'
import { Group } from '../../core/Group'
import { Stack } from '../../core/Stack'
import { Text } from '../../core/Text'
import useAuthStore from '../../store/auth/auth.store'
import { useGetPostsQuery } from '../../store/rtk/posts'
import { Center } from '../../core/Center'
import { Input } from '../../core/Input'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function AllPosts() {
    const { data } = useGetPostsQuery()
    const { payload } = useAuthStore()

    const [searchTerm, setSearchTerm] = useState('')
    const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value
        setSearchTerm(value)
    }

    return (
        <>
            <Stack>
                <Group justify="between">
                    <Text variant="subtitle">Tous les posts</Text>
                    {payload && (
                        <Link to="/posts/new">
                            <Button size="lg">Créér un post</Button>
                        </Link>
                    )}
                </Group>

                <Center>
                    <Input placeholder="Rechercher un post" onChange={handleSearchTerm} />
                </Center>

                <Text variant="paragraph">
                    <ul className="list-disc list-inside">
                        {data
                            ?.filter((post) =>
                                post.title
                                    .toLowerCase()
                                    .normalize('NFD')
                                    .replace(/\p{Diacritic}/gu, '')
                                    .includes(
                                        searchTerm
                                            .toLowerCase()
                                            .normalize('NFD')
                                            .replace(/\p{Diacritic}/gu, '')
                                    )
                            )
                            .map((post) => (
                                <li key={post._id}>
                                    <Link to={`/posts/${post._id}`}>{post.title}</Link>
                                </li>
                            ))}
                    </ul>
                </Text>
            </Stack>
        </>
    )
}
