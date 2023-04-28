import { Card } from '../../core/Card'
import { AllPosts } from '../posts/allPosts'
import { HomeAnalytics } from './homeAnalytics'

export function Home() {
    return (
        <div className="space-y-4">
            <Card>
                <AllPosts />
                <HomeAnalytics />
            </Card>
        </div>
    )
}
