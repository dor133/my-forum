import { Card } from '../../../core/Card'
import { Center } from '../../../core/Center'
import { Group } from '../../../core/Group'
import { Stack } from '../../../core/Stack'
import { Text } from '../../../core/Text'
import { Button } from '../../../core/Button'
import useAuthStore from '../../../store/auth/auth.store'
import { useGetUserQuery, useGetUserPostsQuery } from '../../../store/rtk/users'
import { useDeletePostMutation } from '../../../store/rtk/posts'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { UserAnalytics } from '../userAnalytics'

const checkSchema = Yup.object().shape({
    checkbox: Yup.array().min(1, 'Vous devez sélectionner au moins un post'),
})

export function Profile() {
    const { payload } = useAuthStore()
    const [deletePost] = useDeletePostMutation()
    const { data: user } = useGetUserQuery(payload!.sub)
    const { data: posts } = useGetUserPostsQuery(payload!.sub)
    const userDate = new Date(user?.createdDate!)
    const havePosts = posts ? posts?.length > 0 : false

    const formik = useFormik({
        initialValues: { checkbox: [] },
        validationSchema: checkSchema,
        onSubmit: (values) => {
            const query = { ids: values.checkbox }
            deletePost(query)
        },
        validateOnBlur: false,
        validateOnChange: false,
    })

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

                        {formik.errors.checkbox && (
                            <Text variant="paragraph" className="text-red-900">
                                {formik.errors.checkbox}
                            </Text>
                        )}

                        {havePosts ? (
                            posts?.map((post) => (
                                <div className="flex items-center mb-1.5" key={post._id}>
                                    <Group>
                                        <input
                                            type="checkbox"
                                            name="checkbox"
                                            id={post._id}
                                            value={post._id}
                                            className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
                                            onChange={formik.handleChange}
                                        />
                                        <label htmlFor={post._id} className="text-base leading-7 text-gray-700 ml-2">
                                            <Link to={`/posts/${post._id}`}>{post.title}</Link>
                                        </label>
                                        <Button size="xs">
                                            <Link to={`/posts/${post._id}/modify`}>Modifier</Link>
                                        </Button>
                                    </Group>
                                </div>
                            ))
                        ) : (
                            <Text variant="label">Vous n'avez pas encore posté</Text>
                        )}
                    </form>
                </div>

                <div className="border-t border-gray-200 py-2">
                    <UserAnalytics />
                </div>
            </Stack>
        </Card>
    )
}
