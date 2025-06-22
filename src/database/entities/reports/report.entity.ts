import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn ,CreateDateColumn,UpdateDateColumn } from "typeorm"
import { CategoryReport } from "./category-report.entity"

@Entity("reports")
export class Report {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({nullable:true, length: 255 })
  name: string

  @Column({nullable:true, length: 255 })
  email: string

  @Column({nullable:true, length: 20 })
  phone: string

  @Column({nullable:true, length: 500 })
  subject: string

  @Column({ type: "nvarchar", length: "max" })
  message: string

  @ManyToOne(
    () => CategoryReport,
    (category) => category.reports,
  )
  @JoinColumn({ name: "category" })
  category: CategoryReport

  @CreateDateColumn({ type: 'datetime2' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime2' })
  updated_at: Date;
}
