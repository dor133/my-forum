export type Justify = 'normal' | 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch'
export type Align = 'start' | 'end' | 'center' | 'baseline' | 'stretch'

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

export const alignMap: Record<Align, string> = {
    start: 'align-start',
    end: 'align-end',
    center: 'align-center',
    baseline: 'align-baseline',
    stretch: 'align-stretch',
}
