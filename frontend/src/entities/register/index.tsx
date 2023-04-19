import { Card } from '../../core/Card'
import { Text } from '../../core/Text'
import { Input } from '../../core/Input'
import { Center } from '../../core/Center'
import { Stack } from '../../core/Stack'
import { Button } from '../../core/Button'
import { useRegisterMutation } from '../../store/rtk/auth'
import { useFormik } from 'formik'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { Group } from '../../core/Group'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const registerSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, "Nom d'utilisateur trop court")
        .max(20, "Nom d'utilisateur trop long")
        .matches(/^(?!.*[^\w\s.-])/gi, "Le nom d'utilisateur ne doit pas contenir de caractères spéciaux")
        .required("Nom d'utilisateur requis"),
    password: Yup.string().min(8, 'Mot de passe trop court').required('Mot de passe requis'),
    email: Yup.string().email('Adresse email invalide').required('Adresse email requise'),
})

export function Register() {
    const navigate = useNavigate()

    const [register, { error, isSuccess, isError }] = useRegisterMutation()

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: registerSchema,
        onSubmit: (values) => {
            register(values)
        },
        validateOnBlur: false,
        validateOnChange: false,
    })

    useEffect(() => {
        if (isSuccess) {
            navigate('/login')
        }
    }, [isSuccess, isError])

    return (
        <Card>
            <Stack spacing={8}>
                <Stack spacing={1}>
                    <Center>
                        <Text variant="title">Créer un compte</Text>
                    </Center>

                    <Center>
                        <Text variant="label">
                            <a href="/login">Déjà un compte ? Se connecter</a>
                        </Text>
                    </Center>
                </Stack>

                <Stack spacing={4}>
                    {error != null && (
                        <>
                            <Group className="items-center">
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                <Text variant="label" className="text-red-500">
                                    Identifiants déjà utilisés
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
                            id="email"
                            name="email"
                            type="text"
                            autoComplete="email"
                            label="Adresse email"
                            placeholder="Entrez votre adresse email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            {...(formik.errors.email && { errorLabel: formik.errors.email })}
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
                                Créer un compte
                            </Button>
                        </Center>
                    </form>
                </Stack>
            </Stack>
        </Card>
    )
}
