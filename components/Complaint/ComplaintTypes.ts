import { Id } from '../../convex/_generated/dataModel';

export interface ComplaintDTO {
  id?: Id<'complaints'>;
  title: string;
  comment: string;
  idPurchase: Id<'purchases'>;
  idUser: Id<'users'>;
}
