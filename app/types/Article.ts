export type Article = {
    id: number,
    category_id: number,
    title: string,
    url: string,
    summary: string,
    author: string,
    published_at: Date,
    fetched_at: Date,
    is_read: boolean,
    score: number
}