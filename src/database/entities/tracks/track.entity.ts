import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn ,CreateDateColumn,UpdateDateColumn } from "typeorm"
import { CategoryTrack } from "./category-track.entity"

@Entity("tracks")
export class Track {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({nullable:true, length: 255 })
  title: string

  @Column({nullable:true, length: 255 })
  artist: string

  @Column({nullable:true, length: 10 })
  duration: string


  @ManyToOne(
    () => CategoryTrack,
    (category) => category.tracks,
  )
  @JoinColumn({ name: "category" })
  category: CategoryTrack

  @Column({ default: 0 })
  plays: number

  @Column({ type: "nvarchar", length: "max" })
  description: string

  @Column({ name: "release_date", length: 10 })
  releaseDate: string

  @Column({ default: false })
  featured: boolean

  @Column({ nullable: true })
  link: string

  @CreateDateColumn({ type: 'datetime2' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime2' })
  updated_at: Date;
}
