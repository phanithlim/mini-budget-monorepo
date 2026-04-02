import { DataSource } from 'typeorm';
import {
  DATA_SOURCE,
  CATEGORIES_REPOSITORY,
  CATEGORY_SNAPSHOT_REPOSITORY,
  MONTHLY_INIT_LOG_REPOSITORY,
} from '../database/constants';
import { Category } from './entities/category.entity';
import { CategoryMonthlySnapshot } from './entities/category-monthly-snapshot.entity';
import { MonthlyInitLog } from './entities/monthly-init-log.entity';

export const categoriesProviders = [
  {
    provide: CATEGORIES_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
    inject: [DATA_SOURCE],
  },
  {
    provide: CATEGORY_SNAPSHOT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CategoryMonthlySnapshot),
    inject: [DATA_SOURCE],
  },
  {
    provide: MONTHLY_INIT_LOG_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MonthlyInitLog),
    inject: [DATA_SOURCE],
  },
];
