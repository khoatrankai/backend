import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany ,CreateDateColumn,UpdateDateColumn } from "typeorm"
import { CategoryNews } from "./category-news.entity"
import { CategoryActivity } from "./category-activity.entity"
import { Region } from "./region.entity"
import { Slide } from "../slides/slide.entity"

export enum NewsType {
  TRONG_NUOC = "trong_nuoc",
  QUOC_TE = "quoc_te",
  QUAN_SU = "quan_su",
  HOAT_DONG_SU_DOAN="hoat_dong_su_doan"
}

@Entity("news")
export class News {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({nullable:true, length: 500 })
  title: string

  @Column({ type: 'nvarchar', length: 'max' })
  excerpt: string

  @Column({ nullable: true })
  image: string

  @Column({nullable:true, length: 255 })
  author: string

  @Column({nullable:true, length: 20 })
  date: string

  @Column({nullable:true, length: 50 })
  time: string

  @Column({ default: 0 })
  views: number

  @Column({
    type: "nvarchar",
    enum: NewsType,
    default: NewsType.TRONG_NUOC,
  })
  type: NewsType


  @ManyToOne(
    () => CategoryNews,
    (category) => category.news,
  )
  @JoinColumn({ name: "category" })
  category: CategoryNews

  @ManyToOne(
    () => CategoryActivity,
    (category) => category.news,
  )
  @JoinColumn({ name: "category_activity" })
  categoryActivity: CategoryActivity

  @ManyToOne(
    () => Region,
    (region) => region.news,
  )
  @JoinColumn({ name: "region" })
  region: Region

  @OneToMany(
    () => Slide,
    (slide) => slide.news,
  )
  slides: Slide[]

  @Column({ type:"bit",default:0 })
  featured: boolean

  @CreateDateColumn({ type: 'datetime2' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime2' })
  updated_at: Date;
}
