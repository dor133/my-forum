import cx from 'classnames'

type Props = JSX.IntrinsicElements['div'] & {
    inline?: boolean
}

export function Center({ children, className, inline, ...props }: Props) {
    return (
        <div {...props} className={cx('items-center justify-center', inline ? 'inline-flex' : 'flex')}>
            {children}
        </div>
    )
}
