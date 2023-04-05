export type Justify = 'normal' | 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch'

export const justifyMap: Record<Justify, string> = {
    normal: 'justify-normal',
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
    stretch: 'justify-stretch',
}
