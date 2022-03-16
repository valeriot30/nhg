export function fetchJsonAsync(url: string) {
    return new Promise((res, rej) => {
        const options: RequestInit = {
            method: 'GET',
            mode: 'cors',
            cache: 'default',
            credentials: 'omit'
        };

        fetch(url, options)
            .then(response => response.json())
            .then(data => res(data))
            .catch(err => rej(err))
    })
}