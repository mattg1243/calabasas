import { Entity, Column, Index, BeforeInsert } from 'typeorm';
import Model from './Model.entity';
import * as bcrypt from 'bcrypt';

@Entity('users')
export default class User extends Model {
  // @Index('emailIndex')
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  fname: string;

  @Column()
  lname: string;

  @Column()
  acctType: string;

  @Column({ default: 0 })
  credits: number;

  @Column({ default: 0 })
  subTier: 0 | 1 | 2 | 3;
  // email verified?
  @Column({ default: false })
  verified: boolean;

  toJSON() {
    return { ...this, passwordHash: undefined };
  }
  // password hasing
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
  // validating password
  static async comparePasswords(candidatePassword: string, hashedPassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}
