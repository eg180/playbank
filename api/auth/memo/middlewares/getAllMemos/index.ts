import { Memo } from '../../../../src/entities/Memo';

module.exports = async (req: {jwtSub: number}, res: any, next: any) => {
    const requestorsMemos  = await Memo.find({
        where: {
            client: true
        }
    })
    return res.status(200).json({memos: requestorsMemos});
}