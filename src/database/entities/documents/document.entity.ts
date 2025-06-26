import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn ,CreateDateColumn,UpdateDateColumn } from "typeorm"
import { CategoryDocument } from "./category-document.entity"
export enum DocumentType {
  CHI_THI = "chi_thi",
  THONG_BAO = "thong_bao",
  KE_HOACH = "ke_hoach",
  QUY_DINH = "quy_dinh",
}
@Entity("documents")
export class Document {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({nullable:true, length: 500 })
  title: string

  @Column({
   type: "nvarchar",
   length: 50,
   default: DocumentType.CHI_THI,
   })
  type: DocumentType


  @ManyToOne(
    () => CategoryDocument,
    (category) => category.documents,
  )
  @JoinColumn({ name: "category" })
  category: CategoryDocument

  @Column({nullable:true, length: 255 })
  organ: string

  @Column({nullable:true, length: 20 })
  date: string

  @Column({ default: 0 })
  downloads: number

  @Column({nullable:true, length: 50 })
  size: string

  @Column({ nullable: true })
  link: string

  @CreateDateColumn({ type: 'datetime2' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime2' })
  updated_at: Date;
}
