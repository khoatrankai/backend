import { Entity, PrimaryGeneratedColumn, Column ,CreateDateColumn,UpdateDateColumn } from "typeorm"

@Entity("statistical")
export class Statistical {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({nullable:true, length: 255 })
  label: string

  @Column({nullable:true, length: 100 })
  value: string

  @Column({nullable:true, length: 100 })
  icon: string

  @CreateDateColumn({ type: 'datetime2' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime2' })
  updated_at: Date;
}
