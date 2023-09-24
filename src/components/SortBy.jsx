import { Dropdown } from 'flowbite-react'

const SortBy = ({ items, sort, setSort, direction, setDirection }) => {
    const handleSort = (field) => {
        if (field === sort) {
            setDirection(prev => prev === 'asc' ? 'desc' : 'asc');
            return;
        }

        setSort(field);
        setDirection('asc');
    }

    return (
        <Dropdown label="Sort By">
            {items.map(item => (
                <Dropdown.Item key={item.field} className="cursor-pointer gap-2" onClick={() => handleSort(item.field)}>
                    {sort === item.field && (direction === 'asc' ? <i className="fa-solid fa-fade fa-2xs fa-arrow-up"></i> : <i className="fa-solid fa-fade fa-2xs fa-arrow-down"></i>)}
                    {item.name}
                </Dropdown.Item>
            ))}
        </Dropdown>
    )
}

export default SortBy;