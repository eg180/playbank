import { Balance } from '../../../../src/entities/Balance';

module.exports = async (req: {jwtSub: number}, res: any, next: any) => {

    const requestorBalance  = await Balance.findOne({
        where: {
          id: req.jwtSub
        }
      });
    return res.status(200).json({balance: requestorBalance});
}