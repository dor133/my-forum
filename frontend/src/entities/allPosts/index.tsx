import { Button } from '../../core/Button'
import { Group } from '../../core/Group'
import { Stack } from '../../core/Stack'
import { Text } from '../../core/Text'
import useAuthStore from '../../store/auth/auth.store'
import { useGetPostsQuery } from '../../store/rtk/posts'
import { Center } from '../../core/Center'
import { Input } from '../../core/Input'
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { debounce } from 'lodash'

export function AllPosts() {
    const { data } = useGetPostsQuery()
    const { payload } = useAuthStore()

    const debouncedSearch = debounce(async (searchTerm: string) => {
        setSearchTerm(searchTerm)
    }, 500)

    const [searchTerm, setSearchTerm] = useState('')
    const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(e.target.value)
    }

    const filteredPosts = useMemo(
        () =>
            data?.filter((post) => {
                console.log('filtering users')
                return post.title
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/\p{Diacritic}/gu, '')
                    .includes(
                        searchTerm
                            .toLowerCase()
                            .normalize('NFD')
                            .replace(/\p{Diacritic}/gu, '')
                    )
            }),
        [searchTerm]
    )

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
                        {filteredPosts?.map((post) => (
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
