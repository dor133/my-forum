import { Card } from '../../core/Card'
import { AllPosts } from '../allPosts'
import { Header } from '../header'

export function Home() {
    return (
        <div className="space-y-4">
            <Card>
                <Header />
            </Card>

            <Card>
                <AllPosts />
            </Card>
        </div>
    )
}
