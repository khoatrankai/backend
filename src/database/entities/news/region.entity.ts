import { Entity, PrimaryGeneratedColumn, Column, OneToMany ,CreateDateColumn,UpdateDateColumn } from "typeorm"
import { News } from "./news.entity"

@Entity("regions")
export class Region {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({nullable:true, length: 255 })
  name: string

  @Column({nullable:true, length: 100 })
  nametag: string

  @OneToMany(
    () => News,
    (news) => news.region,
  )
  news: News[]

  @CreateDateColumn({ type: 'datetime2' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime2' })
  updated_at: Date;
}
