export type Article = {
    id: number,
    category_id: number,
    title: string,
    url: string,
    summary: string,
    author: string,
    published_at: string,
    fetched_at: string,
    is_read: boolean,
    score: number
}