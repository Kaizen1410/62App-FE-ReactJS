import React from 'react'

const NoData = () => {
    return (
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
            <div className="mx-auto text-center text-8xl">
                <i className="fa-solid fa-ban text-center mb-4"></i>
                <h1 className="text-center text-3xl font-bold">No Data</h1>
            </div>
        </div>
    )
}

export default NoData