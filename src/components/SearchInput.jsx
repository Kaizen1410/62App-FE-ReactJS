import { TextInput } from "flowbite-react";

const SearchInput = ({ className, placeholder, setSearch }) => {
    return (
        <TextInput
            className={`w-56 ${className}`}
            icon={() => <i className="fa-solid fa-magnifying-glass text-gray-500 dark:text-gray-400"></i>}
            type="search"
            placeholder={placeholder || 'Search...'}
            onChange={(e) => setSearch(e.target.value)} />
        )
}

export default SearchInput;