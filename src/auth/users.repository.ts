import { ConflictException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCredentialsDto } from './dto/userCredentials.dto';
import { generate } from 'generate-password';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private datasource: DataSource) {
    super(User, datasource.createEntityManager());
  }

  async createUser(userCredentialsDto: UserCredentialsDto) {
    const { userName, name, firstName, role } = userCredentialsDto;

    const found = await this.findOneBy({ userName });
    if (found) {
      throw new ConflictException(
        `An account already exists for e-mail ${userName}.`,
      );
    }

    const password = generate({
      length: 10,
      numbers: true,
      uppercase: true,
    });

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.create({
      userName,
      name,
      firstName,
      role,
      password: hashedPassword,
    });

    return await this.save(newUser);
  }
}
