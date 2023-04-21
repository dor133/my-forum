import { Card } from '../../core/Card'
import { Center } from '../../core/Center'
import { Group } from '../../core/Group'
import { Stack } from '../../core/Stack'
import { Text } from '../../core/Text'
import { Button } from '../../core/Button'
import useAuthStore from '../../store/auth/auth.store'
import { useGetUserQuery, useGetUserPostsQuery, useGetUserNbCommentsQuery } from '../../store/rtk/users'
import { useDeletePostQuery } from '../../store/rtk/posts'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const checkSchema = Yup.object().shape({
    checkbox: Yup.array().min(1, 'Vous devez sélectionner au moins un post'),
})

export function Profile() {
    const { payload } = useAuthStore()
    // const {data: post } = useDeletePostQuery()
    const { data: user } = useGetUserQuery(payload!.sub)
    const { data: posts } = useGetUserPostsQuery(payload!.sub)
    const { data: nbComments } = useGetUserNbCommentsQuery(payload!.sub)
    const userDate = new Date(user?.createdDate!)
    const havePosts = posts ? posts?.length > 0 : false

    const formik = useFormik({
        initialValues: { checkbox: [] },
        validationSchema: checkSchema,
        onSubmit: (values) => {},
    })

    console.log(formik.values)

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
                    <form onSubmit={formik.handleSubmit}>
                        <Group justify="between">
                            <Text variant="subtitle" className="mb-2 mt-2">
                                Mes posts
                            </Text>
                            <Button size="lg" color="red" type="submit">
                                Supprimer
                            </Button>
                        </Group>

                        {havePosts ? (
                            posts?.map((post) => (
                                <div className="flex items-center mb-1.5" key={post._id}>
                                    <input
                                        type="checkbox"
                                        name="checkbox"
                                        id={post._id}
                                        value={post._id}
                                        className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
                                        onChange={formik.handleChange}
                                    />
                                    <label htmlFor={post._id} className="text-base leading-7 text-gray-700 ml-2">
                                        <a href={`/posts/${post._id}`}>{post.title}</a>
                                    </label>
                                </div>
                            ))
                        ) : (
                            <Text variant="label">Vous n'avez pas encore posté</Text>
                        )}
                    </form>
                </div>
            </Stack>
        </Card>
    )
}
