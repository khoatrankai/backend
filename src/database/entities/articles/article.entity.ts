import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,CreateDateColumn,UpdateDateColumn  } from "typeorm"
import { CategoryArticle } from "./category-article.entity"

export enum ArticleType {
  CCHC = "cchc",
  TTTT = "tttt",
  TTPL = "ttpl",
  KHQS = "khqs",
}

@Entity("articles")
export class Article {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({nullable:true, length: 500 })
  title: string

  @Column({ type: "nvarchar", length: "max" })
  excerpt: string

  @Column({nullable:true, length: 255 })
  author: string

  @Column({nullable:true, length: 20 })
  date: string

  @Column({ default: 0 })
  views: number

  @Column({ name: "read_time", length: 50 })
  readTime: string


  @ManyToOne(
    () => CategoryArticle,
    (category) => category.articles,
  )
  @JoinColumn({ name: "category" })
  category: CategoryArticle

  @Column({ default: false })
  featured: boolean

  @Column({
  type: "nvarchar",
  length: 50,
  default: ArticleType.CCHC,
  })
  type: ArticleType;


  @Column({ type: "simple-array" })
  tags: string[]

  @CreateDateColumn({ type: 'datetime2' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime2' })
  updated_at: Date;
}
