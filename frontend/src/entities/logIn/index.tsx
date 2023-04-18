import { Card } from '../../core/Card'
import { Text } from '../../core/Text'
import { Input } from '../../core/Input'
import { Center } from '../../core/Center'
import { Stack } from '../../core/Stack'
import { Button } from '../../core/Button'
import { useLoginMutation } from '../../store/rtk/auth'
import { useFormik, Form } from 'formik'
import { UserLoginQueryPayload } from '../security/types'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { Group } from '../../core/Group'

const validate = (values: UserLoginQueryPayload) => {
    const errors: Partial<UserLoginQueryPayload> = {}

    if (!values.username) {
        errors.username = "Nom d'utilisateur requis"
    }

    if (!values.password) {
        errors.password = 'Mot de passe requis'
    }

    if (values.username && values.password) {
        console.log('authenticated')
    }

    return errors
}

export function LogIn() {
    const [login, { error, isLoading }] = useLoginMutation()

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validate,
        onSubmit: (values) => {
            login(values)
        },
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
                            <a href="#">Créer un compte</a>
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
                        {!formik.errors.username ? (
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                label="Nom d'utilisateur"
                                placeholder="Entrez votre nom d'utilisateur"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                            />
                        ) : (
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                label="Nom d'utilisateur"
                                placeholder="Entrez votre nom d'utilisateur"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                                errorLabel={formik.errors.username}
                            />
                        )}

                        {!formik.errors.password ? (
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                label="Mot de passe"
                                placeholder="Entrez votre mot de passe"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                        ) : (
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                label="Mot de passe"
                                placeholder="Entrez votre mot de passe"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                errorLabel={formik.errors.password}
                            />
                        )}

                        <Button size={'lg'} type="submit">
                            Connexion
                        </Button>
                    </form>
                </Stack>
            </Stack>
        </Card>
    )
}
