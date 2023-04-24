import { Card } from '../../../core/Card'
import { Text } from '../../../core/Text'
import { Input } from '../../../core/Input'
import { Center } from '../../../core/Center'
import { Stack } from '../../../core/Stack'
import { Button } from '../../../core/Button'
import { useLoginMutation } from '../../../store/rtk/auth'
import { useFormik } from 'formik'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { Group } from '../../../core/Group'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'

const loginSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, "Nom d'utilisateur trop court")
        .max(20, "Nom d'utilisateur trop long")
        .matches(/^(?!.*[^\w\s.-])/gi, "Le nom d'utilisateur ne doit pas contenir de caractères spéciaux")
        .required("Nom d'utilisateur requis"),
    password: Yup.string().min(8, 'Mot de passe trop court').required('Mot de passe requis'),
})

export function LogIn() {
    const navigate = useNavigate()

    const [login, { error }] = useLoginMutation()

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            login(values).then((res) => {
                if (!('error' in res)) {
                    navigate('/')
                }
            })
        },
        validateOnBlur: false,
        validateOnChange: false,
    })

    return (
        <Card>
            <Stack spacing={8}>
                <Stack spacing={1}>
                    <Center>
                        <Text variant="title">Connexion</Text>
                    </Center>

                    <Center>
                        <Text variant="label">
                            <Link to="/register">Créer un compte</Link>
                        </Text>
                    </Center>
                </Stack>

                <Stack spacing={4}>
                    {error != null && (
                        <>
                            <Group className="items-center">
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                <Text variant="label" className="text-red-500">
                                    Identifiants incorrects
                                </Text>
                            </Group>
                        </>
                    )}

                    <form className="space-y-4" onSubmit={formik.handleSubmit}>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            label="Nom d'utilisateur"
                            placeholder="Entrez votre nom d'utilisateur"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            {...(formik.errors.username && { errorLabel: formik.errors.username })}
                        />

                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            label="Mot de passe"
                            placeholder="Entrez votre mot de passe"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            {...(formik.errors.password && { errorLabel: formik.errors.password })}
                        />
                        <Center>
                            <Button size={'lg'} type="submit">
                                Connexion
                            </Button>
                        </Center>
                    </form>
                </Stack>
            </Stack>
        </Card>
    )
}
