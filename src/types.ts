export type VoyageCategory = 'Omrah' | 'Voyage Organisé' | 'Voyage à la Carte';
export type VoyageStatus = 'normal' | 'almost-full' | 'full' | 'limited-offer';

export interface Stage {
  id: string;
  name: string;
  hotelName: string;
  googleMapsUrl: string;
  days: number;
  icon?: 'kaaba' | 'dome' | 'default';
}

export interface Voyage {
  id: string;
  title: string;
  imageUrl: string;
  imageUrls?: string[];
  price: number;
  description: string;
  category: VoyageCategory;
  duration: string;
  date: string;
  createdAt: string;
  stages?: Stage[];
  status?: VoyageStatus;
}

export type MessageType = 'Billetterie' | 'Devis';

export interface Message {
  id: string;
  type: MessageType;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  // Champs spécifiques pour les devis
  devisDetails?: {
    prenom?: string;
    destination?: string;
    besoinVisa?: string;
    volAvecSans?: string;
    nomHotel?: string;
    nombreEtoiles?: string;
    nombreChambres?: string;
    typeChambre?: string;
    pension?: string;
    nombreAdultes?: string;
    nombreEnfants?: string;
    ageEnfants?: string;
    dateDepart?: string;
    dateRetour?: string;
    stages?: Array<{
      name: string;
      hotelName: string;
      googleMapsUrl: string;
      days: number;
    }>;
  };
  // Champs spécifiques pour la billetterie
  billeterieDetails?: {
    prenom?: string;
    destination?: string;
    besoinVisa?: string;
    compagnie?: string;
    nombreAdultes?: string;
    nombreEnfants?: string;
    ageEnfants?: string;
    dateDepart?: string;
    dateRetour?: string;
  };
}
