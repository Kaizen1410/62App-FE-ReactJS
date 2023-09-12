import { Spinner } from "flowbite-react"

const Loading = ({ size }) => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <Spinner size={size} />
        </div>

    )
}

export default Loading