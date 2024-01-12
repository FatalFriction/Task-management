export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const fetchers = (url: string, file:File) => fetch(url,{ method: 'POST', body: file }).then((res) => res.json());