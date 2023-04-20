import { Button } from '../../core/Button'
import { Card } from '../../core/Card'
import { Center } from '../../core/Center'
import { Input } from '../../core/Input'
import { Stack } from '../../core/Stack'
import { Text } from '../../core/Text'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useCreatePostMutation } from '../../store/rtk/posts'
import { useEffect } from 'react'
import { Group } from '../../core/Group'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { TextArea } from '../../core/TextArea'

const postSchema = Yup.object().shape({
    title: Yup.string().max(30, 'Le titre ne doit pas dépasser 30 caractères').required('Titre requis'),
    text: Yup.string().required('Texte requis'),
})

export function NewPost() {
    const navigate = useNavigate()

    const [createPost, { error, isSuccess, isError }] = useCreatePostMutation()

    const formik = useFormik({
        initialValues: {
            title: '',
            text: '',
        },
        validationSchema: postSchema,
        onSubmit: (values) => {
            createPost(values).then(() => {
                navigate(`/`)
            })
        },
        validateOnBlur: false,
        validateOnChange: false,
    })

    return (
        <Card>
            <Stack spacing={4}>
                <Center>
                    <Text variant="title">Créer un post</Text>
                </Center>

                {error != null && (
                    <>
                        <Group className="items-center">
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                            <Text variant="label" className="text-red-500">
                                Erreur
                            </Text>
                        </Group>
                    </>
                )}

                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                    <Input
                        id="title"
                        name="title"
                        type="text"
                        label="Titre"
                        autoFocus={true}
                        placeholder="Entrez le titre"
                        {...(!formik.errors.title && { infoLabel: 'Le titre ne doit pas dépasser 30 caractères' })}
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        {...(formik.errors.title && { errorLabel: formik.errors.title })}
                    />

                    <TextArea
                        id="text"
                        name="text"
                        placeholder="Entrez le contenu"
                        label="Contenu"
                        size={56}
                        onChange={formik.handleChange}
                        value={formik.values.text}
                        {...(formik.errors.text && { errorLabel: formik.errors.text })}
                    ></TextArea>

                    <Center>
                        <Button size="lg" type="submit">
                            Poster
                        </Button>
                    </Center>
                </form>
            </Stack>
        </Card>
    )
}
