import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn ,CreateDateColumn,UpdateDateColumn } from "typeorm"
import { News } from "../news/news.entity"

@Entity("slides")
export class Slide {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  image: string

  @Column({nullable:true, length: 500 })
  title: string

  @Column({ type: "nvarchar", length: "max" })
  description: string

  @ManyToOne(
    () => News,
    (news) => news.slides,
  )
  @JoinColumn({ name: "news" })
  news: News

  @CreateDateColumn({ type: 'datetime2' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime2' })
  updated_at: Date;
}
