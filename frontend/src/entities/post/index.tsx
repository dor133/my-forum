import { useParams } from 'react-router-dom'
import { useGetPostQuery } from '../../store/rtk/posts'
import { Card } from '../../core/Card'
import { Text } from '../../core/Text'
import { Stack } from '../../core/Stack'

export function Post() {
    const { id } = useParams()
    const { data } = useGetPostQuery(id!)
    // console.log(typeof data?.createdDate)
    const date = new Date(data?.createdDate!)
    // console.log(typeof date)
    // console.log(typeof date.toDateString())

    return (
        <Card>
            <Stack spacing={4}>
                <Text variant="title">{data?.title}</Text>
                <Text variant="paragraph">
                    Par: {data?.authorId} le {date.toLocaleDateString()}
                </Text>
                <Text variant="paragraph">{data?.text}</Text>
            </Stack>
        </Card>
    )
}
