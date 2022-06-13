import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  OneToMany,
} from "typeorm";
import { Exercise } from "./Exercise";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 64,
  })
  firstname: string;

  @Column({
    length: 64,
  })
  lastname: string;

  @Column({
    length: 16,
    unique: true,
  })
  username: string;

  @Column({ length: 128 })
  password: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Exercise, (exercise) => exercise.location)
  exercises: Exercise[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ select: false })
  deleted_at: Date;

  @VersionColumn({ select: false })
  version: number;
}
