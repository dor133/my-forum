import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { Card } from '../../core/Card'
import { Stack } from '../../core/Stack'
import { Center } from '../../core/Center'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { Text } from '../../core/Text'
import { Group } from '../../core/Group'
import { Input } from '../../core/Input'
import { TextArea } from '../../core/TextArea'
import { Button } from '../../core/Button'
import { useGetPostQuery, useModifyPostMutation } from '../../store/rtk/posts'

const postSchema = Yup.object().shape({
    title: Yup.string().max(30, 'Le titre ne doit pas dépasser 30 caractères').required('Titre requis'),
    text: Yup.string().required('Texte requis'),
})

export function ModifyPost() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: post, isError: errorPost, isLoading: isPostLoading } = useGetPostQuery(id!)

    const [modifyPost, { error }] = useModifyPostMutation()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: post?.title,
            text: post?.text,
        },
        validationSchema: postSchema,
        onSubmit: (values) => {
            modifyPost({ id: id, data: values }).then(() => navigate(`/posts/${id}`))
        },
        validateOnBlur: false,
        validateOnChange: false,
    })

    return (
        <Card>
            <Stack spacing={4}>
                <Center>
                    <Text variant="title">Modifier mon post</Text>
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
                            Modifier
                        </Button>
                    </Center>
                </form>
            </Stack>
        </Card>
    )
}
