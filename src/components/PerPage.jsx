import { Select } from 'flowbite-react'

const PerPage = ({ setPerPage }) => {
    return (
        <Select className="w-32 ml-auto mt-5" onChange={(e) => setPerPage(e.target.value)}>
            <option value={10}>10 / Page</option>
            <option value={25}>25 / Page</option>
            <option value={50}>50 / Page</option>
        </Select>
    )
}

export default PerPage