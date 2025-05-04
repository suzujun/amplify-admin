import express, { Request, Response } from 'express';
// @ts-ignore: 型定義は不要なため除外
import comments from '../data/comments';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.json(comments);
});

type PostParams = { id: string };

interface Comment {
    id: number;
}

router.get('/:id', (req: Request<PostParams>, res: Response) => {
    const comment = comments.find((c: Comment) => c.id === Number(req.params.id));
    if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
});

router.post('/', (req, res) => {
    // 保存処理は行わず、成功レスポンスのみ
    res.status(201).json({ message: 'Comment created (mock)' });
});

router.delete('/:id', (req, res) => {
    // 削除処理なし
    res.status(204).send(); // No Content
});

export default router;
