interface Options {
   method ?: [
     'GET',
     'POST',
     'DELETE',
     'PUT',
     'PATCH',
     'OPTIONS'
   ][number]
   body ?: any
   access_token ?: string
   refresh_token ?: string
}

export const FetchMyApi = async (
    path : string, { 
    method, 
    body, 
    access_token, 
    refresh_token 
} : Options) => {
    const baseURL = 'http://localhost:8080' 
    //'https://api.imagetracker.org'
    console.log(baseURL)
    const res = await fetch(`${baseURL}/${path}`, {
        method : method ?? 'GET',
        mode : 'cors',
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : JSON.stringify({
                access_token :  access_token ?? '',
                refresh_token : refresh_token ?? ''
            })
        },
        body : JSON.stringify(body)
    })
    const json = await res.json()

    return json
}