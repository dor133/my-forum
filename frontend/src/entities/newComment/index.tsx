import { TextArea } from '../../core/TextArea'
import { Button } from '../../core/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCreateCommentMutation } from '../../store/rtk/comments'
import { useParams } from 'react-router-dom'
import useAuthStore from '../../store/auth/auth.store'
import { Group } from '../../core/Group'
import { Text } from '../../core/Text'

const commentSchema = Yup.object().shape({
    text: Yup.string().required('Texte requis'),
})

export function NewComment() {
    const { id } = useParams<{ id: string }>()
    const { payload } = useAuthStore()
    const [createComment, { error, isSuccess, isError }] = useCreateCommentMutation()

    const formik = useFormik({
        initialValues: {
            text: '',
        },
        validationSchema: commentSchema,
        onSubmit: (values, { resetForm }) => {
            createComment({ data: values, postId: id })
            resetForm()
        },
        validateOnBlur: false,
        validateOnChange: false,
    })

    return (
        <form className="space-y-2" onSubmit={formik.handleSubmit}>
            <TextArea
                id="text"
                name="text"
                placeholder="Écrivez un commentaire"
                size={16}
                onChange={formik.handleChange}
                value={formik.values.text}
                {...(formik.errors.text && { errorLabel: formik.errors.text })}
            />

            <Group>
                <Button size="lg" type="submit" active={payload ? true : false}>
                    Envoyer
                </Button>
                {!payload && (
                    <Text variant="label" className="italic text-red-400">
                        Vous devez être connecté
                    </Text>
                )}
            </Group>
        </form>
    )
}
