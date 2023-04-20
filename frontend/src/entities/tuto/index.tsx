import { Button } from '../../core/Button'
import { Card } from '../../core/Card'
import { Center } from '../../core/Center'
import { Checkbox } from '../../core/Checkbox'
import { Group } from '../../core/Group'
import { Input } from '../../core/Input'
import { Select } from '../../core/Select'
import { Text } from '../../core/Text'
import { Stack } from '../../core/Stack'

export function Tuto() {
    return (
        <Card>
            <Stack spacing={6}>
                <Center>
                    <Text variant="title">My-Forum</Text>
                </Center>

                <Stack>
                    <Text variant="paragraph"></Text>
                </Stack>

                <Stack spacing={1}>
                    <Text variant="subtitle">Bienvenue à toi !</Text>
                    <Text variant="paragraph">
                        Dans ce projet, tu vas développer un forum pour te familiariser avec nos technologies et intervenir sur nos code-bases.
                    </Text>
                    <Text variant="paragraph">
                        N'hésite pas à examiner les dossiers présents dans le dossier <code>/frontend</code> et à visiter notre{' '}
                        <a className="text-blue-500 hover:text-blue-600" href="https://wiki.namkin.fr" target="_blank" rel="noreferrer">
                            wiki
                        </a>
                        .
                    </Text>
                    <Text variant="paragraph">Tu peux également créer les composants dont tu auras besoin pour le mini-projet !</Text>
                </Stack>

                {/* <Button onClick={() => setShowCoreComponents(!showCoreComponents)}>Voir les composants réutilisables</Button> */}

                {/* {showCoreComponents && ( */}
                <>
                    <Stack>
                        <Text variant="subtitle">
                            <code>Group</code> et <code>Button</code>
                        </Text>

                        <Group>
                            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                                <div key={size}>
                                    <Button size={size}>Button {size}</Button>
                                </div>
                            ))}
                        </Group>
                    </Stack>

                    <Stack>
                        <Text variant="subtitle">
                            <code>Stack</code> et <code>Input</code>
                        </Text>
                        <Stack>
                            <Input id="select1" label="Input de test" placeholder="Placeholder" infoLabel="Je suis un message informatif optionnel" />
                            <Input id="select2" label="Input avec des erreurs" errorLabel="Ce champ contient des erreurs" placeholder="Placeholder" />
                        </Stack>
                    </Stack>

                    <Stack>
                        <Text variant="subtitle">
                            <code>Select</code>
                        </Text>
                        <Select id="select" label="Label">
                            {[1, 2, 3].map((nb) => (
                                <option key={nb}>Option {nb}</option>
                            ))}
                        </Select>
                    </Stack>

                    <Stack>
                        <Text variant="subtitle">
                            <code>Checkbox</code>
                        </Text>
                        <Checkbox id="checkbox" label="Label" />
                    </Stack>
                </>
                {/* )} */}
            </Stack>
        </Card>
    )
}
