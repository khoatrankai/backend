import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn ,CreateDateColumn,UpdateDateColumn } from "typeorm"
import { User } from "../users/user.entity"

@Entity("groups")
export class Group {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({nullable:true, length: 255 })
  name: string


  @ManyToOne(() => User)
  @JoinColumn({ name: "head" })
  head: User

  @Column({ type: "nvarchar", length: "max" })
  description: string

  @Column({nullable:true, length: 20 })
  phone: string

  @Column({nullable:true, length: 255 })
  email: string

  @Column({ name: "description_contact", type: "nvarchar", length: "max" })
  descriptionContact: string

  @OneToMany(
    () => User,
    (user) => user.group,
  )
  users: User[]

  @CreateDateColumn({ type: 'datetime2' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime2' })
  updated_at: Date;
}
