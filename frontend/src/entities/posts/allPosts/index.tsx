import { Button } from '../../../core/Button'
import { Group } from '../../../core/Group'
import { Stack } from '../../../core/Stack'
import { Text } from '../../../core/Text'
import useAuthStore from '../../../store/auth/auth.store'
import { useGetPostsQuery } from '../../../store/rtk/posts'
import { Center } from '../../../core/Center'
import { Input } from '../../../core/Input'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { debounce } from 'lodash'

export function AllPosts() {
    const [page, setPage] = useState(1)

    const { payload } = useAuthStore()

    const debouncedSearch = debounce(async (searchTerm: string) => {
        setSearchTerm(searchTerm)
    }, 500)

    const [searchTerm, setSearchTerm] = useState('')
    const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(e.target.value)
        setPage(1)
    }
    const { data, error, isLoading } = useGetPostsQuery({ page, search: searchTerm })

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

                {error ? (
                    <div>Une erreur est survenue</div>
                ) : isLoading ? (
                    <div>Chargement ...</div>
                ) : (
                    <>
                        <Center>
                            <Input placeholder="Rechercher un post" onChange={handleSearchTerm} />
                        </Center>

                        <Text variant="paragraph">
                            <ul className="list-disc list-inside">
                                {data?.map((post) => (
                                    <li key={post._id}>
                                        <Link to={`/posts/${post._id}`}>{post.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </Text>

                        <div className="flex flex-row mx-auto">
                            <button
                                type="button"
                                className="bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-primary-500 hover:text-white px-3"
                                onClick={() => page > 1 && setPage(page - 1)}
                            >
                                <div className="flex flex-row align-middle">
                                    <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill-rule="evenodd"
                                            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                    <p className="ml-2">Précédent</p>
                                </div>
                            </button>

                            <div className="bg-gray-800 text-white py-2 border-l border-gray-200 px-3">
                                <div className="flex flex-row align-middle">
                                    <span className="">{page}</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="bg-gray-800 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-primary-500 hover:text-white px-3"
                                onClick={() => data?.length === 10 && setPage(page + 1)}
                            >
                                <div className="flex flex-row align-middle">
                                    <span className="mr-2">Suivant</span>
                                    <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill-rule="evenodd"
                                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </>
                )}
            </Stack>
        </>
    )
}
