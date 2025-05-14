export interface Article {
    _path: string;
    title: string;
    date: string;
    description: string;
    content: string;
}

export interface ArticleSnapshot {
    _path: string;
    title: string;
    date: string;
    description: string;
}

export interface Frontmatter {
    title: string;
    date: string;
    description: string;
}