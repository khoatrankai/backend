import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn ,CreateDateColumn,UpdateDateColumn } from "typeorm"
import { User } from "../users/user.entity"

@Entity("histories_leader")
export class HistoriesLeader {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({nullable:true, length: 50 })
  period: string

  @Column({nullable:true, length: 255 })
  name: string

  @Column({nullable:true, length: 255 })
  position: string


  @ManyToOne(
    () => User,
    (user) => user.historiesLeader,
  )
  @JoinColumn({ name: "user" })
  user: User

  @CreateDateColumn({ type: 'datetime2' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime2' })
  updated_at: Date;
}
