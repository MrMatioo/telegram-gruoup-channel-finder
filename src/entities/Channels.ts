import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Channels {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, type: "bigint" })
  channelId!: string;

  @Column({ type: "varchar", nullable: true })
  username!: string | null;

  @Column({ type: "varchar" })
  title!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
