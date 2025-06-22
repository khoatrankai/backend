import { Entity, PrimaryGeneratedColumn, Column, OneToMany ,CreateDateColumn,UpdateDateColumn } from "typeorm"
import { Software } from "./software.entity"

@Entity("categories_platform")
export class CategoryPlatform {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({nullable:true, length: 255 })
  name: string

  @Column({nullable:true, length: 100 })
  nametag: string

  @Column({nullable:true, length: 100 })
  icon: string

  @OneToMany(
    () => Software,
    (software) => software.category,
  )
  software: Software[]

  @CreateDateColumn({ type: 'datetime2' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime2' })
  updated_at: Date;
}
