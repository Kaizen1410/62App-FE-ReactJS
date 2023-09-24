import { TextInput } from "flowbite-react";
import debounce from "lodash.debounce";

const SearchInput = ({ className, placeholder, setSearch }) => {
    const handleSearch = (s) => {
        console.log('yea')
        setSearch(s);
    }

    return (
        <TextInput
            className={`w-56 ${className || ''}`}
            icon={() => <i className="fa-solid fa-magnifying-glass text-gray-500 dark:text-gray-400"></i>}
            type="search"
            placeholder={placeholder || 'Search...'}
            onChange={debounce((e) => {handleSearch(e.target.value)}, 300)} />
        )
}

export default SearchInput;