import { Entity, PrimaryGeneratedColumn, Column, OneToMany ,CreateDateColumn,UpdateDateColumn } from "typeorm"
import { Track } from "./track.entity"

@Entity("categories_track")
export class CategoryTrack {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({nullable:true, length: 255 })
  name: string

  @Column({nullable:true, length: 100 })
  nametag: string

  @OneToMany(
    () => Track,
    (track) => track.category,
  )
  tracks: Track[]

  @CreateDateColumn({ type: 'datetime2' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime2' })
  updated_at: Date;
}
