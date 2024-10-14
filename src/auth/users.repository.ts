import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDataDto } from './dto/userData.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private datasource: DataSource) {
    super(User, datasource.createEntityManager());
  }

  async createUser(userDataDto: UserDataDto) {
    const { userName, name, firstName, role, password } = userDataDto;

    const found = await this.findOneBy({ userName });
    if (found) {
      throw new ConflictException(
        `An account already exists for e-mail ${userName}.`,
      );
    }

    // const password = generate({
    //   length: 10,
    //   numbers: true,
    //   uppercase: true,
    // });

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.create({
      userName,
      name,
      firstName,
      role,
      password: hashedPassword,
    });

    await this.save(newUser);
    return [newUser, password];
  }

  async getUser(userName: string) {
    return await this.findOneBy({ userName });
  }

  async deleteUser(userName: string) {
    const found = await this.getUser(userName);
    if (!found) {
      throw new NotFoundException(`No user found for email ${userName}.`);
    }

    await this.delete(found);
  }
}
