export interface Post {
    title: string;
    body: string;
}

export type IdentifiedPost = Post & {id: number};