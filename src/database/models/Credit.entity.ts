import { Entity, Column, ManyToOne, OneToOne } from 'typeorm';
import Model from './Model.entity';
import User from './User.entity';
import Beat from './Beat.entity';

@Entity('credits')
export default class Credit extends Model {
  @ManyToOne(() => User, (user) => user.creditsAcquired)
  currentOwner: User;

  @OneToOne(() => User)
  previousOwner: User | null

  @OneToOne(() => Beat)
  beatPurchased: Beat | null
}
