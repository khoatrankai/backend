import { Entity, PrimaryGeneratedColumn, Column ,CreateDateColumn,UpdateDateColumn } from "typeorm"

@Entity("histories")
export class History {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({nullable:true, length: 10 })
  year: string

  @Column({nullable:true, length: 255 })
  title: string

  @Column({ type: "nvarchar", length: "max" })
  description: string

  @Column({ default: false })
  highlight: boolean

  @CreateDateColumn({ type: 'datetime2' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime2' })
  updated_at: Date;
}
