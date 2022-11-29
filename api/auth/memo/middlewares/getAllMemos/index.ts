import { appDataSource } from '../../../../dbconfig';
import { Memo } from '../../../../src/entities/Memo';

module.exports = async (req: {jwtSub: number}, res: any, next: any) => {
    console.log('finding memo with id', req.jwtSub);
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
    console.log('reqs memos', requestorsMemos);
    return res.status(200).json({memos: requestorsMemos});
}