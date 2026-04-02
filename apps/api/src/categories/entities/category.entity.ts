import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { CategoryMonthlySnapshot } from './category-monthly-snapshot.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: number;

  @Column()
  icon: string;

  @Column({ name: 'transaction_count', default: 0 })
  transactionCount: number;

  @Column({ name: 'total_spend', type: 'float', default: 0 })
  totalSpend: number;

  @Column({ name: 'default_budget', type: 'float', nullable: true })
  defaultBudget: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  // @OneToMany(() => Transaction, (transaction) => transaction.category)
  // transactions: Transaction[];

  @OneToMany(() => CategoryMonthlySnapshot, (snapshot) => snapshot.category)
  snapshots: CategoryMonthlySnapshot[];
}
