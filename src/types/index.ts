export interface Product {
  id: string;
  name: string;
  tag: 'Best Seller' | 'New Arrival' | 'Sale';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  alt: string;
  colors: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Review {
  id: string;
  quote: string;
  author: string;
  location: string;
  badgeInitials: string;
  badgeBg: string;
  rating: number;
}
