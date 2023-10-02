//+++++++++++++++++++++++++++++++++++++++
//parse cookies to array of cookie object
//+++++++++++++++++++++++++++++++++++++++

export const parseCookies = (headerCookies: string) => {
    if (!headerCookies) return []

    let cookies = headerCookies.split(';')

    let cookiesArray = cookies.map((cookie) => {
        let [name, ...rest] = cookie.split('=')

        name = name.trim()
        let value = rest.join('=').trim()

        return { name, value }
    })

    return cookiesArray
}