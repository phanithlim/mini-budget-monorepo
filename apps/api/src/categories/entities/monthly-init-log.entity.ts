import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('monthly_init_log')
@Unique(['month', 'year'])
export class MonthlyInitLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  month: number;

  @Column()
  year: number;

  @Column({ name: 'initialized_at', type: 'timestamp' })
  initializedAt: Date;
}
