export interface ArticleToc {
    depth: number;
    links: {
        id: string;
        depth: number;
        text: string;
    }[];
    searchDepth: number;
    title: string;
}

export interface ArticleChildren {
    type: string;
    tag: string;
    props: {
        id: string;
    };
    children: {
        type: string;
        value: string;
    }[];
}

export interface Article {
    _path: string;
    title: string;
    date: string;
    description: string;
    body: {
        children: ArticleChildren[];
        toc: ArticleToc;
    }
}

export interface ArticleSnapshot {
    _path: string;
    title: string;
    date: string;
    description: string;
}