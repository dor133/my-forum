import { Card } from '../../core/Card'
import { AllPosts } from '../posts/allPosts'

export function Home() {
    return (
        <div className="space-y-4">
            <Card>
                <AllPosts />
            </Card>
        </div>
    )
}
