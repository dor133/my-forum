import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useGetPostsQuery } from '../../../../../store/rtk/posts'
import { Items } from '../items'

interface Props {
    itemsPerPage: number
}

export function PaginatedItems({ itemsPerPage }: Props) {
    const [itemOffset, setItemOffset] = useState(0)
    const endOffset = itemOffset + itemsPerPage
    console.log(`Loading items from ${itemOffset} to ${endOffset}`)
    // const { data: posts } = useGetPostsQuery()
    // const currentItems = posts?.slice(itemOffset, endOffset)
    // const pageCount = posts ? Math.ceil(posts.length / itemsPerPage) : 0

    // const handlePageClick = (selectedItem: { selected: number }) => {
    //     if (posts) {
    //         const newOffset = (selectedItem.selected * itemsPerPage) % posts.length
    //         console.log(`User requested page number ${selectedItem.selected}, which is offset ${newOffset}`)
    //         setItemOffset(newOffset)
    //     }
    // }

    const nextLabel = <div className="flex flex-1 justify-start">{'Next >'}</div>
    const previousLabel = <div className="">{'< Previous'}</div>

    return (
        <>
            {/* <Items currentItems={currentItems} />
            <ReactPaginate
                breakLabel="..."
                nextLabel={nextLabel}
                previousLabel={previousLabel}
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                renderOnZeroPageCount={null}
                containerClassName="flex"
            /> */}
        </>
    )
}
