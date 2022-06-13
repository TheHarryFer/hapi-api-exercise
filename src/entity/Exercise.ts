import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Location } from "./Location";

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 64,
  })
  type: string;

  @ManyToOne(() => User, (user) => user.exercises)
  user: User;

  @Column({ type: "double" })
  duration: number;

  @Column({ type: "double" })
  calories: number;

  @ManyToOne(() => Location, (location) => location.exercises)
  location: Location;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ select: false })
  deleted_at: Date;

  @VersionColumn({ select: false })
  version: number;
}
