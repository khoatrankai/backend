import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn ,CreateDateColumn,UpdateDateColumn } from "typeorm"
import { CategoryPlatform } from "./category-platform.entity"
import { Platform } from "./platform.entity"

@Entity("software")
export class Software {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({nullable:true, length: 255 })
  name: string

  @Column({ type: "nvarchar", length: "max" })
  description: string

  @Column({nullable:true, length: 50 })
  version: string

  @Column({nullable:true, length: 50 })
  size: string

  @Column({nullable:true, length: 20 })
  date: string

  @Column({ default: 0 })
  downloads: number

  @Column({ nullable: true })
  link: string

  @Column({ type: "decimal", precision: 3, scale: 2, default: 0 })
  rating: number

  @ManyToOne(
    () => CategoryPlatform,
    (category) => category.software,
  )
  @JoinColumn({ name: "category" })
  category: CategoryPlatform


  @ManyToOne(
    () => Platform,
    (platform) => platform.software,
  )
  @JoinColumn({ name: "platform" })
  platform: Platform

  @Column({ default: false })
  featured: boolean

  @Column({ type: "nvarchar", length: "max" })
  requirements: string

  @Column({nullable:true, length: 255 })
  developer: string

  @Column({nullable:true, length: 100 })
  license: string

  @CreateDateColumn({ type: 'datetime2' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime2' })
  updated_at: Date;
}
