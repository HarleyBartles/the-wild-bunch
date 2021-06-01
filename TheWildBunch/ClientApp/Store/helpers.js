export const storeEntityAction = ( action = {} ) => {
    const {
        active = false,
        messages = [],
        success = false,
        requestId = 0
    } = action

    return {
        active,
        messages,
        success,
        requestId
    }
}