import { Link } from 'react-router-dom'
import { Text } from '../../../../../core/Text'
import { PostQueryData } from '../../../../security/types'
import { useMemo, useState } from 'react'
import { debounce } from 'lodash'
import { Center } from '../../../../../core/Center'
import { Input } from '../../../../../core/Input'

interface Props {
    currentItems: PostQueryData[] | undefined
}

export function Items({ currentItems }: Props) {
    const debouncedSearch = debounce(async (searchTerm: string) => {
        setSearchTerm(searchTerm)
    }, 500)

    const [searchTerm, setSearchTerm] = useState('')
    const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(e.target.value)
    }

    const filteredPosts = useMemo(
        () =>
            currentItems?.filter((post) => {
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
        [searchTerm, currentItems]
    )
    return (
        <>
            <Center>
                <Input placeholder="Rechercher un post" onChange={handleSearchTerm} />
            </Center>

            {filteredPosts?.map((post) => (
                <div key={post._id}>
                    <Text variant="paragraph">
                        <Link to={`/posts/${post._id}`}>{post.title}</Link>
                    </Text>
                </div>
            ))}
        </>
    )
}
