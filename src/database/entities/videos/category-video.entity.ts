import { Entity, PrimaryGeneratedColumn, Column, OneToMany ,CreateDateColumn,UpdateDateColumn } from "typeorm"
import { Video } from "./video.entity"

@Entity("categories_video")
export class CategoryVideo {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({nullable:true, length: 255 })
  name: string

  @Column({nullable:true, length: 100 })
  nametag: string

  @OneToMany(
    () => Video,
    (video) => video.category,
  )
  videos: Video[]

  @CreateDateColumn({ type: 'datetime2' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime2' })
  updated_at: Date;
}
