import express, { Request, Response } from 'express';
// @ts-ignore: 型定義は不要なため除外
import users from '../data/users';

const router = express.Router();

interface Post {
    id: number;
}

type UserParams = { id: string };

router.get('/', (req, res) => {
    res.header('Content-Range', `users 0-2/${users.length}`);
    res.header('X-Total-Count', `${users.length}`);
    res.json(users);
});

router.get('/:id', (req: Request<UserParams>, res: Response) => {
    const post = users.find((p: Post) => p.id === Number(req.params.id));
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
});

router.post('/', (req, res) => {
    // データ保存なし、成功レスポンスのみ
    res.status(201).json({ message: 'Post created (mock)' });
});

router.delete('/:id', (req, res) => {
    // 削除処理なし
    res.status(204).send(); // No Content
});

export default router;
