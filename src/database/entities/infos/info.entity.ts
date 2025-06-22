import { Entity, PrimaryGeneratedColumn, Column ,CreateDateColumn,UpdateDateColumn } from "typeorm"

@Entity("infos")
export class Info {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({nullable:true, length: 100 })
  icon: string

  @Column({nullable:true, length: 255 })
  label: string

  @Column({nullable:true, length: 255 })
  value: string

  @Column({nullable:true, length: 50 })
  color: string

  @CreateDateColumn({ type: 'datetime2' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime2' })
  updated_at: Date;
}
