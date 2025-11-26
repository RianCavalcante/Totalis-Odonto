export interface Service {
  id: string;
  title: string;
  description: string;
  details: string;
  iconName: string;
  imageUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  imageUrl?: string;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  address: string;
  mapsLink: string;
  instagram: string;
}