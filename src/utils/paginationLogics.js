export const disabled = (pagination, page, link) => {
    return (
        (link.label === '&laquo; Previous' && page===1) ||
        (link.label === 'Next &raquo;' && page===pagination?.last_page)
    )
}

export const showLabel = (link) => {
    return (
        link.label === '&laquo; Previous'
            ? '<'
        : link.label === 'Next &raquo;'
            ? '>'
        : link.label
    )
}