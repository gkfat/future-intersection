export async function onRequest(context) {
    const key = context.params.path.join('/');
    const url = `https://pub-1223fea72cbd4afca686b8c67c14f6da.r2.dev/future-intersection/${key}`;
  
    const res = await fetch(url);
  
    if (!res.ok) {
        return new Response('Not found', { status: 404 });
    }
  
    return new Response(res.body, {
        headers: {
            'Content-Type': res.headers.get('content-type') || 'application/octet-stream',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}