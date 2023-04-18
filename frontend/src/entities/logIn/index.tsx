import { Card } from '../../core/Card'
import { Text } from '../../core/Text'
import { Input } from '../../core/Input'
import { Center } from '../../core/Center'
import { Stack } from '../../core/Stack'
import { Button } from '../../core/Button'

export function LogIn() {
    return (
        // <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        //     <Card>
        //         <Stack>
        //             <Center>
        //                 <Text variant="title">Connectez-vous à votre compte</Text>
        //                 <Text variant="paragraph">
        //                     <a href="/">Créer un compte</a>
        //                 </Text>
        //             </Center>

        //             <form className="space-y-4" action="#" method="post">
        //                 <Input
        //                     id="username"
        //                     name="username"
        //                     type="text"
        //                     autoComplete="username"
        //                     label="Nom d'utilisateur"
        //                     placeholder="Entrez votre nom d'utilisateur"
        //                 />
        //                 <Input
        //                     id="password"
        //                     name="password"
        //                     type="password"
        //                     autoComplete="current-password"
        //                     label="Mot de passe"
        //                     placeholder="Entrez votre mot de passe"
        //                 />
        //             </form>
        //         </Stack>
        //     </Card>
        // </div>

        <Card>
            <Stack spacing={8}>
                <Stack spacing={1}>
                    <Center>
                        <Text variant="title">Connexion</Text>
                    </Center>

                    <Center>
                        <Text variant="label">
                            <a href="/">Créer un compte</a>
                        </Text>
                    </Center>
                </Stack>

                <Stack spacing={4}>
                    <form className="space-y-4" action="#" method="post">
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            label="Nom d'utilisateur"
                            placeholder="Entrez votre nom d'utilisateur"
                        />
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            label="Mot de passe"
                            placeholder="Entrez votre mot de passe"
                        />
                    </form>
                </Stack>

                <Button size={'lg'}>Connexion</Button>
            </Stack>
        </Card>
    )
}
