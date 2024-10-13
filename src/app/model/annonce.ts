export interface Annonce {
  id?: number;
  titre: string;
  description: string;
  prix: number;
  localisation: string;
  type: string;  // Vente ou Location
  photos: string[];
  datePublication?: Date;
}
