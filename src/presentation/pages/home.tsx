import { For } from 'solid-js'
import Card from '../../main/components/card'
import Layout from '../../main/components/layout'
import Loading from '../../main/components/loading'
import Panel from '../../main/components/panel'
import createPagination from '../../main/hooks/create-pagination'
import { images } from '../extension/background'

const Home = () => {
    const { pagination } = createPagination()

    return (
        <div>
            <Panel />
            <Layout>
                <For each={images().slice(pagination[0], pagination[1])} fallback={ <Loading /> }>
                    {(image) => <Card image={image} />}
                </For>
            </Layout> 
        </div>
    )
}

export default Home