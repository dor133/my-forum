import { Link } from 'react-router-dom'
import { Group } from '../../core/Group'
import { Text } from '../../core/Text'
import { Card } from '../../core/Card'
import useAuthStore from '../../store/auth/auth.store'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { rtkApi } from '../../store/rtk'
import { useDispatch } from 'react-redux'

export function Header() {
    const { payload } = useAuthStore()
    const dispatch = useDispatch()

    const handleDisconnectClick = () => {
        useAuthStore.getState().logOut()
        dispatch(rtkApi.util.resetApiState())
    }

    return (
        <Card className="mb-3">
            <Group spacing={6} justify="between" className="flex items-center text-base font-semibold leading-6 text-gray-900">
                <Text variant="title">
                    <Link to="/">My forum</Link>
                </Text>

                <Link to="/">Accueil</Link>

                <Link to="/posts/new">Poster</Link>

                {!payload ? (
                    <Link to="/login">Se connecter</Link>
                ) : (
                    <Popover className="relative">
                        <Popover.Group>
                            <Popover.Button className="flex items-center gap-x-1">
                                Mon profil
                                <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                            </Popover.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute -left-5 top-full z-10 mt-3 overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                    <div className="p-4">
                                        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                                            <Link to="/profile">Dashboard</Link>
                                        </div>
                                        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                                            <Link to="/">
                                                <button onClick={handleDisconnectClick}>Déconnexion</button>
                                            </Link>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover.Group>
                    </Popover>
                )}
            </Group>
        </Card>
    )
}
