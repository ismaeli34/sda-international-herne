// models/Events.model.ts
export interface EventsModel {
  id:string;
  title: string;
  description: string;
  flyer?: string;
  date?: string;      // YYYY-MM-DD
  time?: string;      // HH:mm
  location?: string;
  contact_person?:string;
}

