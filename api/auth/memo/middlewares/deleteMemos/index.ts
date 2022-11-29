import { In } from 'typeorm';
import { Memo } from '../../../../src/entities/Memo';

module.exports = async (req: {body: number[]}, res: any, next: any) => {
    try {
    const memoIds: number[] = req.body;
    
    const memosToDelete  = await Memo.find({
        where: {
            id: In([...memoIds])
        }
    })
    const result = await Memo.remove(memosToDelete)
    return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({error: "Unable to delete"})
    }
    
}