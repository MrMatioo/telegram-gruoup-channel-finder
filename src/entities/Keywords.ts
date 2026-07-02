import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Keywords {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, type: "varchar" })
  keyword!: string;

  @Column({ type: "integer", default: 0 })
  resultCount!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
