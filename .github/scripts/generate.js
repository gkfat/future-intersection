//@ts-check
import dotenv from 'dotenv';
import fs from 'fs';
import { OpenAI } from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// vars
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.resolve(__dirname, '../../public/articles');
const today = new Date().toISOString().slice(0, 10);

// 使用 github actions secret 或本地檔案
const promptBase =  process.env.ARTICLE_PROMPT?.trim() || fs.readFileSync(path.resolve(__dirname, '../../prompt.txt'), 'utf-8').trim();

if (!promptBase) {
    console.error('❌ 請設定 ARTICLE_PROMPT 環境變數');
    process.exit(1);
}

// 取得標題列表
const indexPath = path.resolve(__dirname, '../../public/articles/index.json');
const existingTitles = fs.existsSync(indexPath)
    ? JSON.parse(fs.readFileSync(indexPath, 'utf-8')).map(entry => entry.title).filter(Boolean)
    : [];

const titleList = existingTitles.map(title => `- ${title}`).join('\n');

const prompt = `${promptBase}\n\n${titleList}`;

/**
 * 若相同日期則產生流水號
 * @param {string} baseDir
 * @param {string} date
 */
function getUniqueFilename(baseDir, date) {
    let index = 0;
    let filename;
    do {
        const suffix = index === 0 ? '' : `-${index}`;
        filename = path.join(baseDir, `${date}${suffix}.md`);
        index++;
    } while (fs.existsSync(filename));
    return filename;
}

const filename = getUniqueFilename(contentDir, today);
const basename = path.basename(filename);

const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
        {
            role: 'user', content: prompt, 
        },
    ],
    temperature: 0.8,
});

const markdown = response.choices[0].message.content ?? '';
const h1Match = markdown.match(/^# (.+)$/m);
const title = h1Match?.[1] || `未命名文章 (${today})`;

// 解析 description：尋找 H1 之後第一個非空段落
let description = '';
if (h1Match) {
    const h1Index = markdown.indexOf(h1Match[0]);
    const afterH1 = markdown.slice(h1Index + h1Match[0].length).trim();
    const paragraphMatch = afterH1.match(/^(?:>?\s*)?(.+?)(?:\n{2,}|$)/s);
    description = paragraphMatch?.[1].replace(/\n/g, ' ').trim() || '';
}

// 寫入 Markdown 檔案
fs.mkdirSync(path.dirname(filename), { recursive: true });
fs.writeFileSync(
    filename,
    `---\ntitle: ${title}\ndate: ${new Date().toISOString()}\ndescription: ${JSON.stringify(description)}\n---\n\n${markdown}`,
);

console.log(`Generated: ${basename}`);

// ✨ 更新 index.json
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));

const snapshots = files.map((f) => {
    const raw = fs.readFileSync(path.join(contentDir, f), 'utf-8');
    const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---/);
    const frontmatter = frontmatterMatch?.[1] || '';

    const data = Object.fromEntries(
        frontmatter
            .split('\n')
            .map(line => line.trim())
            .filter(Boolean)
            .map(line => {
                const [key, ...rest] = line.split(':');
                let value = rest.join(':').trim();
                if (value.startsWith('"') || value.startsWith('\'')) {
                    value = value.slice(1, -1);
                }
                return [key.trim(), value];
            }),
    );

    // 將 date 轉為 ISO 字串（若原本就不是）
    const isoDate = new Date(data.date).toISOString();

    return {
        filename: f,
        title: data.title || '未命名',
        date: isoDate,
        description: data.description || '',
    };
});

fs.writeFileSync(path.join(contentDir, 'index.json'), JSON.stringify(snapshots, null, 2));

console.log('📦 index.json updated.');