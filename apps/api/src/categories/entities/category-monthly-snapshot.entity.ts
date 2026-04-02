import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Category } from './category.entity';

@Entity('category_monthly_snapshots')
@Unique(['categoryId', 'month', 'year'])
export class CategoryMonthlySnapshot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.snapshots, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  month: number;

  @Column()
  year: number;

  @Column()
  name: string;

  @Column()
  icon: string;

  @Column()
  type: number;

  @Column({ type: 'float', nullable: true })
  budget: number | null;

  @Column({ name: 'transaction_count', default: 0 })
  transactionCount: number;

  @Column({ name: 'total_spend', type: 'float', default: 0 })
  totalSpend: number;
}
