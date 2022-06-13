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
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ type: "double" })
  longtitude: number;

  @Column({ type: "double" })
  latitude: number;

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
