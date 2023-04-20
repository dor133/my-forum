import { decrement, increment } from '../../store/test/counterSlice'
import { Stack } from '../../core/Stack'
import { useAppDispatch, useAppSelector } from '../../store'

export function Counter() {
    const count = useAppSelector((state) => state.counter.value)
    const dispatch = useAppDispatch()

    return (
        <div>
            <Stack>
                <button aria-label="Increment value" onClick={() => dispatch(increment())}>
                    Increment
                </button>
                <span>Count : {count}</span>
                <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
                    Decrement
                </button>
            </Stack>
        </div>
    )
}
