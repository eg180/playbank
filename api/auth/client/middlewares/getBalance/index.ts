import { Balance } from '../../../../src/entities/Balance';

module.exports = async (req: {jwtSub: number}, res: any, next: any) => {

    const requestorBalance  = await Balance.findOneBy({
        client: true
      });
    res.status(200).json({balance: requestorBalance});
    next();
}