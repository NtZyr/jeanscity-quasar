export function getLocalToken() {
    const tokenStr = localStorage.getItem("token")
    if(!tokenStr) {
        return null
    }
    return tokenStr
}