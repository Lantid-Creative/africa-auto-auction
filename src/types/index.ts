// API Types for Azure Backend Integration

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'google' | 'apple';
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface CarListing {
  id: string;
  userId: string;
  title: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  transmission: 'automatic' | 'manual';
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  bodyType: 'sedan' | 'suv' | 'coupe' | 'hatchback' | 'truck' | 'convertible' | 'van';
  color: string;
  vin?: string;
  description: string;
  images: string[];
  location: {
    country: string;
    city: string;
    state?: string;
  };
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  features: string[];
  status: 'pending' | 'approved' | 'rejected' | 'sold';
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Auction {
  id: string;
  carListingId: string;
  carListing?: CarListing;
  sellerId: string;
  seller?: User;
  startingPrice: number;
  reservePrice?: number;
  currentBid?: number;
  buyNowPrice?: number;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  bidsCount: number;
  watchersCount: number;
  winnerId?: string;
  winner?: User;
  createdAt: string;
  updatedAt: string;
}

export interface Bid {
  id: string;
  auctionId: string;
  userId: string;
  user?: User;
  amount: number;
  createdAt: string;
}

export interface CarMake {
  id: string;
  name: string;
  logo?: string;
  models: CarModel[];
}

export interface CarModel {
  id: string;
  makeId: string;
  name: string;
  years: number[];
}

export interface FilterOptions {
  makes?: string[];
  models?: string[];
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  transmission?: string[];
  fuelType?: string[];
  bodyType?: string[];
  location?: string[];
  condition?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form Types
export interface CarSubmissionForm {
  make: string;
  model: string;
  year: number;
  mileage: number;
  transmission: 'automatic' | 'manual';
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  bodyType: string;
  color: string;
  vin?: string;
  description: string;
  images: File[];
  country: string;
  city: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  features: string[];
  startingPrice: number;
  reservePrice?: number;
  buyNowPrice?: number;
}

// African Countries
export const AFRICAN_COUNTRIES = [
  'Nigeria', 'South Africa', 'Kenya', 'Ghana', 'Egypt',
  'Morocco', 'Tanzania', 'Ethiopia', 'Uganda', 'Cameroon',
  'Côte d\'Ivoire', 'Senegal', 'Zimbabwe', 'Zambia', 'Rwanda',
  'Botswana', 'Namibia', 'Mozambique', 'Angola', 'Tunisia'
] as const;

// Car Makes
export const CAR_MAKES = [
  { id: 'toyota', name: 'Toyota', models: ['Camry', 'Corolla', 'Land Cruiser', 'Hilux', 'RAV4', 'Prado', 'Highlander', 'Avalon'] },
  { id: 'honda', name: 'Honda', models: ['Accord', 'Civic', 'CR-V', 'Pilot', 'HR-V', 'Odyssey'] },
  { id: 'mercedes', name: 'Mercedes-Benz', models: ['C-Class', 'E-Class', 'S-Class', 'GLE', 'GLC', 'G-Class', 'AMG GT'] },
  { id: 'bmw', name: 'BMW', models: ['3 Series', '5 Series', '7 Series', 'X3', 'X5', 'X7', 'M3', 'M5'] },
  { id: 'lexus', name: 'Lexus', models: ['ES', 'RX', 'LX', 'GX', 'IS', 'LS', 'NX'] },
  { id: 'audi', name: 'Audi', models: ['A4', 'A6', 'A8', 'Q5', 'Q7', 'Q8', 'RS6'] },
  { id: 'ford', name: 'Ford', models: ['F-150', 'Explorer', 'Escape', 'Mustang', 'Ranger', 'Edge'] },
  { id: 'volkswagen', name: 'Volkswagen', models: ['Golf', 'Passat', 'Tiguan', 'Touareg', 'Polo', 'Jetta'] },
  { id: 'hyundai', name: 'Hyundai', models: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Palisade', 'Kona'] },
  { id: 'nissan', name: 'Nissan', models: ['Altima', 'Maxima', 'Rogue', 'Pathfinder', 'Patrol', 'X-Trail'] },
  { id: 'porsche', name: 'Porsche', models: ['911', 'Cayenne', 'Panamera', 'Macan', 'Taycan'] },
  { id: 'range-rover', name: 'Range Rover', models: ['Range Rover', 'Range Rover Sport', 'Velar', 'Evoque', 'Defender'] },
  { id: 'jeep', name: 'Jeep', models: ['Grand Cherokee', 'Wrangler', 'Cherokee', 'Compass', 'Gladiator'] },
  { id: 'kia', name: 'Kia', models: ['Optima', 'Sorento', 'Sportage', 'Telluride', 'Seltos', 'Carnival'] },
  { id: 'peugeot', name: 'Peugeot', models: ['208', '308', '3008', '5008', '508'] },
] as const;

export const BODY_TYPES = [
  { id: 'sedan', name: 'Sedan' },
  { id: 'suv', name: 'SUV' },
  { id: 'coupe', name: 'Coupe' },
  { id: 'hatchback', name: 'Hatchback' },
  { id: 'truck', name: 'Truck/Pickup' },
  { id: 'convertible', name: 'Convertible' },
  { id: 'van', name: 'Van/Minivan' },
] as const;

export const FUEL_TYPES = [
  { id: 'petrol', name: 'Petrol' },
  { id: 'diesel', name: 'Diesel' },
  { id: 'electric', name: 'Electric' },
  { id: 'hybrid', name: 'Hybrid' },
] as const;

export const CONDITIONS = [
  { id: 'excellent', name: 'Excellent', description: 'Like new, minimal wear' },
  { id: 'good', name: 'Good', description: 'Well maintained, minor imperfections' },
  { id: 'fair', name: 'Fair', description: 'Average condition, some repairs needed' },
  { id: 'poor', name: 'Poor', description: 'Significant wear, major repairs needed' },
] as const;

export const CAR_FEATURES = [
  'Air Conditioning', 'Leather Seats', 'Sunroof/Moonroof', 'Navigation System',
  'Backup Camera', 'Bluetooth', 'Cruise Control', 'Heated Seats',
  'Parking Sensors', 'Alloy Wheels', 'Apple CarPlay', 'Android Auto',
  'Keyless Entry', 'Push Start', 'Premium Sound System', 'Third Row Seating',
  'Tow Package', 'Roof Rack', 'Blind Spot Monitor', 'Lane Departure Warning'
] as const;
