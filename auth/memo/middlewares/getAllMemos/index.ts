import { appDataSource } from '../../../../dbconfig';
import { Memo } from '../../../../src/entities/Memo';

module.exports = async (req: {jwtSub: number}, res: any, next: any) => {
    // const requestorsMemos  = await Memo.find({
    //     where: {
    //         client: req.jwtSub
    //     }
    // })
    const requestorsMemos = await appDataSource
      .getRepository(Memo)
      .createQueryBuilder("memos")
      .where(
        "memos.clientId = :id", {id: req.jwtSub})
      .getMany();
    return res.status(200).json({memos: requestorsMemos});
}