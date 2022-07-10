export const apiRoute = 'https://jsonplaceholder.typicode.com/posts';

export function fetchJson<T>(endpoint: string): Promise<T> {
    return fetch(endpoint).then(x => x.json() as unknown as T)
}

