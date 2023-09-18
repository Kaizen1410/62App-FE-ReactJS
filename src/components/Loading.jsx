import { Spinner } from "flowbite-react"

const Loading = ({ size }) => {
    return (
        <div className="flex items-center justify-center w-full h-96">
            <Spinner size={size} />
        </div>

    )
}

export default Loading