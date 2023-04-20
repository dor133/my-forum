import cx from 'classnames'
import { Justify, justifyMap, Align, alignMap } from '../types'

type Sizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type Props = JSX.IntrinsicElements['div'] & {
    spacing?: Sizes
    justify?: Justify
    align?: Align
}

const sizes: Record<Sizes, string> = {
    '1': 'space-x-1',
    '2': 'space-x-2',
    '3': 'space-x-3',
    '4': 'space-x-4',
    '5': 'space-x-5',
    '6': 'space-x-6',
    '7': 'space-x-7',
    '8': 'space-x-8',
    '9': 'space-x-9',
    '10': 'space-x-10',
    '11': 'space-x-11',
    '12': 'space-x-12',
}

export function Group({ spacing = 2, justify, align, children, className, ...rest }: Props) {
    return (
        <div
            className={cx(
                'flex flex-row flex-wrap items-center',
                sizes[spacing],
                justify ? justifyMap[justify] : undefined,
                align ? alignMap[align] : undefined,
                className
            )}
            {...rest}
        >
            {children}
        </div>
    )
}
