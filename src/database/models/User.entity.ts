import { Entity, Column, Index, BeforeInsert, OneToMany, ManyToOne } from 'typeorm';
import Model from './Model.entity';
import * as bcrypt from 'bcrypt';
import Beat from './Beat.entity';

@Entity('users')
export default class User extends Model {
  // @Index('emailIndex')
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  bio: string;
  // all images will be stored in the s3 bucket
  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  fname: string;

  @Column({ nullable: true })
  lname: string;

  @Column()
  acctType: string;
  // these credit columns will reset every month
  @Column({ default: 0 })
  creditsToSpend: number;

  @Column({ default: 0 })
  creditsAcquired: number;
  // this one will not reset
  @Column({ default: 0 })
  totalCreditsAcquired: number;

  @ManyToOne(() => Beat, (beat) => beat.artist)
  uploadedBeats: Beat;

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
