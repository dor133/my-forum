import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import cx from 'classnames'
import { Stack } from '../Stack'
import { Text } from '../Text'

type Sizes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64

type Props = JSX.IntrinsicElements['textarea'] & {
    label?: string
    infoLabel?: string
    errorLabel?: string
    size?: Sizes
}

const sizes: Record<Sizes, string> = {
    0: 'h-0',
    1: 'h-1',
    2: 'h-2',
    3: 'h-3',
    4: 'h-4',
    5: 'h-5',
    6: 'h-6',
    8: 'h-8',
    10: 'h-10',
    12: 'h-12',
    16: 'h-16',
    20: 'h-20',
    24: 'h-24',
    32: 'h-32',
    40: 'h-40',
    48: 'h-48',
    56: 'h-56',
    64: 'h-64',
}

export function TextArea({ size = 12, label, id, infoLabel, errorLabel, className, ...props }: Props) {
    return (
        <Stack spacing={1}>
            {label && (
                <label htmlFor={id} className="block">
                    <Text variant="label">{label}</Text>
                </label>
            )}
            <div className="mt-2 relative">
                <textarea
                    id={id}
                    className={cx(
                        'resize-none block w-full rounded-md border-0 pl-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 focus:outline-none placeholder:italic',
                        sizes[size],
                        errorLabel
                            ? 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500 pr-10'
                            : 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-primary-600 pr-2'
                    )}
                    {...props}
                ></textarea>
                {errorLabel && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                )}
            </div>
            {infoLabel && <p className="mt-2 text-sm text-gray-500">{infoLabel}</p>}
            {errorLabel && <p className="mt-2 text-sm text-red-600">{errorLabel}</p>}
        </Stack>
    )
}
