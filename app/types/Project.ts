export type Project = {
    id: number
    title: string
    description: string
    link: string
    language: string            // langage principal GitHub
    is_featured: boolean        // affiché ou non sur le portfolio
}