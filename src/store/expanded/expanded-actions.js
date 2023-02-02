export const SET_EXPAND = "@@expand/SET_EXPAND"

export const setExpand = (isExpanded) => ({
    type: SET_EXPAND,
    payload: isExpanded,
})