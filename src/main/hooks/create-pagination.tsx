import { createSignal } from "solid-js"
import { createStore } from "solid-js/store"
import CreateImages from "./create-images"

const [pagination, setPagination] = createStore<[number, number]>([0, 20])
const [page, setPage] = createSignal(1)

const createPagination = () => {
    const itemsPerPage = 20
    const { getImages } = new CreateImages()

    const next = () => {
        setPagination(c => {
            if (getImages().length > c[1]) {
                setPage(c => c + 1)
                return [c[0] + itemsPerPage, c[1] + itemsPerPage]
            } else {
                return c
            }
        })
    }

    const previous = () => {
        setPagination(c => {
            if (0 < c[0]) {
                setPage(c => c - 1)
                return [c[0] - itemsPerPage, c[1] - itemsPerPage]
            } else {
                return c
            }
        })
    }

    const getPage = (pg : number) => {
      const final = pg * itemsPerPage
      const init = final - itemsPerPage
      setPagination([
        init,
        final
      ])
      setPage(pg)
    }

    const getScroll = (div ?: HTMLDivElement) => {
        const lastVisibleItem = page() * 9
        if (div) {
            if (lastVisibleItem >= page()) {
                div.scrollLeft += div.scrollWidth
            }
        }
    }

    const getPages = () => {
        const string = Math.ceil(getImages().length / itemsPerPage).toLocaleString(navigator.language)
        const index = [] as number[]

        for (let i = 1; i <= parseInt(string); i++) {
            index.push(i)
        }

        return {
            index,
            string
        }
    }

    return {
        getPages,
        getPage,
        previous,
        next,
        getScroll,
        pagination,
        setPagination,
        page,
        setPage
    }
}

export default createPagination