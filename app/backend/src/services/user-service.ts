import { IUser, IAccount, IUserAccount } from "../interfaces/user-interface";
import { ITransactionUpdateBalance } from "../interfaces/transaction-interface";
import UserModel from "../database/models/user-model";
import AccountModel from "../database/models/account-model";

export default class UserService {
  public userModel = UserModel;
  public accountModel = AccountModel;

  public getUser = async (username: string): Promise<IUser> => {
    const user = await this.userModel.findOne({
      where: { username },
      raw: true,
    });

    return user as IUser;
  };

  public createUser = async (user: IUser): Promise<IUserAccount> => {
    const newAccount = await this.accountModel.create({ balance: 100 });
    const newUser = await this.userModel.create({
      ...user,
      accountId: newAccount.id,
    });

    const newUserAccount = {
      ...newUser.toJSON(),
      account: newAccount.toJSON(),
    };

    return newUserAccount as IUserAccount;
  };

  public getUserAccount = async (username: string): Promise<IUserAccount> => {
    const user = await this.userModel.findOne({
      where: { username },
      include: [
        { model: AccountModel, as: "account", attributes: ["balance"] },
      ],
    });

    return user as unknown as IUserAccount;
  };

  public updateUserBalance = async (obj: ITransactionUpdateBalance): Promise<IAccount> => {
    const { id, balance } = obj;
  
    const account = await this.accountModel.update({ balance }, { where: { id } });

    return account as unknown as IAccount;
  };
}
