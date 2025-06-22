import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn ,CreateDateColumn,UpdateDateColumn } from "typeorm"
import { CategoryImage } from "./category-image.entity"

@Entity("images")
export class Image {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({nullable:true, length: 255 })
  title: string

  @Column()
  thumbnail: string

  @Column({nullable:true, length: 20 })
  date: string

  @Column({ default: 0 })
  views: number


  @ManyToOne(
    () => CategoryImage,
    (category) => category.images,
  )
  @JoinColumn({ name: "category" })
  category: CategoryImage


  @CreateDateColumn({ type: 'datetime2' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime2' })
  updated_at: Date;
}
