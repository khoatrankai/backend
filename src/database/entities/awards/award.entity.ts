import { Entity, PrimaryGeneratedColumn, Column ,CreateDateColumn,UpdateDateColumn } from "typeorm"

@Entity("awards")
export class Award {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({nullable:true, length: 500 })
  name: string

  @Column({nullable:true, length: 10 })
  year: string

  @Column({ type: "nvarchar", length: "max" })
  description: string

  @Column({nullable:true, length: 100 })
  icon: string

  @Column({nullable:true, length: 50 })
  color: string

  @Column({ name: "bg_color", length: 50 })
  bgColor: string

  @Column({nullable:true, length: 100 })
  level: string

  @CreateDateColumn({ type: 'datetime2' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime2' })
  updated_at: Date;
}
