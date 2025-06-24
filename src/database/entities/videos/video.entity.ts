import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn ,CreateDateColumn,UpdateDateColumn } from "typeorm"
import { CategoryVideo } from "./category-video.entity"

@Entity("videos")
export class Video {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({nullable:true, length: 500 })
  title: string

  @Column()
  thumbnail: string

  @Column({nullable:true, length: 10 })
  duration: string

  @Column({nullable:true, length: 20 })
  date: string

  @Column({ default: 0 })
  views: number

  @Column({ nullable: true })
  link: string

  @ManyToOne(
    () => CategoryVideo,
    (category) => category.videos,
  )
  @JoinColumn({ name: "category" })
  category: CategoryVideo

  @Column({ type: "nvarchar", length: "max" })
  description: string

  @CreateDateColumn({ type: 'datetime2' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime2' })
  updated_at: Date;
}
