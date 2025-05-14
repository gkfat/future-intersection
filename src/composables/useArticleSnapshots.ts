import {
    onMounted, ref, 
} from 'vue';
import type { ArticleSnapshot } from '@/types/article';

export function useArticleSnapshots() {
    const articles = ref<ArticleSnapshot[]>([]);
  
    onMounted(async () => {
        const res = await fetch('/articles/index.json');
        const list: { filename: string; title: string; date: string; description: string }[] =
          await res.json();
  
        const promises = list.map(async ({
            filename, title, date, description, 
        }) => {
            return {
                _path: filename.replace('.md', ''),
                title,
                date,
                description,
            };
        });
  
        articles.value = (await Promise.all(promises)).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  
    return { articles };
}