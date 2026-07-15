export type PaintingCategory = 'Landscape' | 'Abstract' | 'Portrait' | 'Nature' | 'Floral' | 'Animals' | 'Still Life' | 'Urban'

export interface Painting {
  id: string
  title: string
  description: string
  story: string
  price: number // in INR
  category: PaintingCategory
  medium: string
  dimensions: {
    width: number
    height: number
    unit: string
  }
  availability: 'Available' | 'Sold'
  image: string
  artist: string
  year: number
}

export const paintings: Painting[] = [
  {
    id: '1',
    title: 'Morning Bloom',
    description: 'A serene landscape capturing the first light of dawn over rolling hills.',
    story: 'This piece was inspired by a misty morning in the countryside. I watched as light gradually revealed layers of nature\'s beauty.',
    price: 42500, // INR
    category: 'Landscape',
    medium: 'Oil on Canvas',
    dimensions: { width: 24, height: 36, unit: 'inches' },
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=500&h=700&fit=crop',
    artist: 'Bloomin Paints',
    year: 2024,
  },
  {
    id: '2',
    title: 'Celestial Dreams',
    description: 'An abstract exploration of colors and emotions through flowing brushstrokes.',
    story: 'Created during a moment of pure inspiration, this abstract piece represents the flow of emotions and the freedom of expression.',
    price: 36000, // INR
    category: 'Abstract',
    medium: 'Acrylic on Canvas',
    dimensions: { width: 30, height: 30, unit: 'inches' },
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1561214115-6f2f134cc4b1?w=500&h=700&fit=crop',
    artist: 'Bloomin Paints',
    year: 2024,
  },
  {
    id: '3',
    title: 'Garden Whispers',
    description: 'Delicate floral composition with rich, vibrant petals.',
    story: 'Inspired by my grandmother\'s garden, this painting celebrates the beauty of flowers in their most natural state.',
    price: 39000, // INR
    category: 'Floral',
    medium: 'Watercolor on Paper',
    dimensions: { width: 20, height: 28, unit: 'inches' },
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1561123294-1cfe7496e811?w=500&h=700&fit=crop',
    artist: 'Bloomin Paints',
    year: 2024,
  },
  {
    id: '4',
    title: 'Wildlife Freedom',
    description: 'A majestic portrayal of animals in their natural habitat.',
    story: 'This piece represents the wild spirit of nature and the importance of preserving our natural world.',
    price: 45500, // INR
    category: 'Animals',
    medium: 'Oil on Canvas',
    dimensions: { width: 28, height: 40, unit: 'inches' },
    availability: 'Sold',
    image: 'https://images.unsplash.com/photo-1577720643272-265a88cda540?w=500&h=700&fit=crop',
    artist: 'Bloomin Paints',
    year: 2024,
  },
  {
    id: '5',
    title: 'Urban Rhythm',
    description: 'A dynamic representation of city life through bold strokes and colors.',
    story: 'Capturing the energy and pulse of urban landscapes, this painting celebrates human civilization and progress.',
    price: 38500, // INR
    category: 'Urban',
    medium: 'Acrylic on Canvas',
    dimensions: { width: 32, height: 32, unit: 'inches' },
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1561132012-4e5b7c5b9b1f?w=500&h=700&fit=crop',
    artist: 'Bloomin Paints',
    year: 2024,
  },
  {
    id: '6',
    title: 'Nature\'s Portrait',
    description: 'A detailed portrait of natural elements and textures.',
    story: 'This work explores the intricate details found in nature, revealing beauty in the smallest things.',
    price: 41000, // INR
    category: 'Nature',
    medium: 'Mixed Media',
    dimensions: { width: 22, height: 32, unit: 'inches' },
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1549887534-f3927a45b6cc?w=500&h=700&fit=crop',
    artist: 'Bloomin Paints',
    year: 2024,
  },
  {
    id: '7',
    title: 'Ethereal Gaze',
    description: 'An intimate portrait capturing the essence of human emotion.',
    story: 'This portrait explores the depth of human expression and the connection between artist and subject.',
    price: 44000, // INR
    category: 'Portrait',
    medium: 'Oil on Canvas',
    dimensions: { width: 20, height: 28, unit: 'inches' },
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1561214115-6f2f134cc4b1?w=500&h=700&fit=crop',
    artist: 'Bloomin Paints',
    year: 2024,
  },
  {
    id: '8',
    title: 'Sunset Reverie',
    description: 'A breathtaking landscape of golden hour light across the horizon.',
    story: 'Painted during a golden sunset, this piece captures the transient beauty of nature\'s most magical moments.',
    price: 43000, // INR
    category: 'Landscape',
    medium: 'Oil on Canvas',
    dimensions: { width: 26, height: 38, unit: 'inches' },
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1561147756-41efb013136f?w=500&h=700&fit=crop',
    artist: 'Bloomin Paints',
    year: 2024,
  },
  {
    id: '9',
    title: 'Abstract Harmony',
    description: 'A mesmerizing composition of geometric forms and vibrant hues.',
    story: 'This abstract piece was created to explore the harmony between chaos and order in artistic expression.',
    price: 37500, // INR
    category: 'Abstract',
    medium: 'Acrylic on Canvas',
    dimensions: { width: 28, height: 28, unit: 'inches' },
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1561131814-cfda59da62d7?w=500&h=700&fit=crop',
    artist: 'Bloomin Paints',
    year: 2024,
  },
  {
    id: '10',
    title: 'Floral Symphony',
    description: 'An elaborate arrangement of flowers in perfect harmony.',
    story: 'A celebration of nature\'s endless variety through the medium of botanical painting.',
    price: 40000, // INR
    category: 'Floral',
    medium: 'Watercolor on Paper',
    dimensions: { width: 24, height: 32, unit: 'inches' },
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1561123294-3a57d8d0d58d?w=500&h=700&fit=crop',
    artist: 'Bloomin Paints',
    year: 2024,
  },
  {
    id: '11',
    title: 'Mountain Peak',
    description: 'A majestic depiction of towering mountains and alpine beauty.',
    story: 'Inspired by travels through mountain ranges, this piece captures the grandeur of the natural world.',
    price: 44500, // INR
    category: 'Landscape',
    medium: 'Oil on Canvas',
    dimensions: { width: 30, height: 42, unit: 'inches' },
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1561120694-d00fa0510d95?w=500&h=700&fit=crop',
    artist: 'Bloomin Paints',
    year: 2024,
  },
  {
    id: '12',
    title: 'Whispers of Wonder',
    description: 'An abstract piece exploring light, shadow, and emotional depth.',
    story: 'This work attempts to visualize the intangible feelings and emotions that arise from quiet contemplation.',
    price: 38000, // INR
    category: 'Abstract',
    medium: 'Acrylic on Canvas',
    dimensions: { width: 26, height: 26, unit: 'inches' },
    availability: 'Sold',
    image: 'https://images.unsplash.com/photo-1561132012-4e5b7c5b9c2e?w=500&h=700&fit=crop',
    artist: 'Bloomin Paints',
    year: 2024,
  },
  {
    id: '13',
    title: 'Tropical Paradise',
    description: 'A vivid representation of exotic flora and vibrant ecosystems.',
    story: 'This painting was inspired by a journey through tropical rainforests and coastal paradises.',
    price: 42000, // INR
    category: 'Nature',
    medium: 'Acrylic on Canvas',
    dimensions: { width: 28, height: 38, unit: 'inches' },
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1561141215-04b21e57da89?w=500&h=700&fit=crop',
    artist: 'Bloomin Paints',
    year: 2024,
  },
  {
    id: '14',
    title: 'Still Life Elegance',
    description: 'A classical arrangement of objects highlighting texture and form.',
    story: 'Exploring the timeless tradition of still life painting with a modern artistic perspective.',
    price: 36500, // INR
    category: 'Still Life',
    medium: 'Oil on Canvas',
    dimensions: { width: 20, height: 24, unit: 'inches' },
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1561215564-81c71fb64e0c?w=500&h=700&fit=crop',
    artist: 'Bloomin Paints',
    year: 2024,
  },
  {
    id: '15',
    title: 'Dance of Colors',
    description: 'A dynamic abstract composition with flowing forms and rich pigmentation.',
    story: 'Inspired by the movement and energy of dance, this abstract piece celebrates fluidity and freedom.',
    price: 39500, // INR
    category: 'Abstract',
    medium: 'Mixed Media',
    dimensions: { width: 32, height: 28, unit: 'inches' },
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1561214115-6f2f134cc4b1?w=500&h=700&fit=crop',
    artist: 'Bloomin Paints',
    year: 2024,
  },
  {
    id: '16',
    title: 'Ocean\'s Embrace',
    description: 'A serene seascape capturing the calm majesty of the ocean.',
    story: 'The ocean has always been a source of inspiration, representing both peace and power.',
    price: 41500, // INR
    category: 'Landscape',
    medium: 'Acrylic on Canvas',
    dimensions: { width: 28, height: 36, unit: 'inches' },
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1561215564-81c71fb64e0c?w=500&h=700&fit=crop',
    artist: 'Bloomin Paints',
    year: 2024,
  },
  {
    id: '17',
    title: 'Portrait of Serenity',
    description: 'A contemplative portrait exploring inner peace and self-reflection.',
    story: 'This portrait aims to capture the quiet strength found in moments of personal reflection.',
    price: 43500, // INR
    category: 'Portrait',
    medium: 'Oil on Canvas',
    dimensions: { width: 22, height: 30, unit: 'inches' },
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1561214115-6f2f134cc4b3?w=500&h=700&fit=crop',
    artist: 'Bloomin Paints',
    year: 2024,
  },
  {
    id: '18',
    title: 'Flora\'s Canvas',
    description: 'An intricate botanical study blending realism with artistic interpretation.',
    story: 'Celebrating the infinite variety of plant life and the beauty found in careful observation.',
    price: 40500, // INR
    category: 'Floral',
    medium: 'Watercolor on Paper',
    dimensions: { width: 22, height: 30, unit: 'inches' },
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1561123294-3a57d8d0d58f?w=500&h=700&fit=crop',
    artist: 'Bloomin Paints',
    year: 2024,
  },
  {
    id: '19',
    title: 'Creature\'s Tale',
    description: 'A beautifully rendered study of wildlife in their natural elements.',
    story: 'This painting celebrates the complexity and grace of animals in the wild.',
    price: 46000, // INR
    category: 'Animals',
    medium: 'Oil on Canvas',
    dimensions: { width: 26, height: 34, unit: 'inches' },
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1577720643272-265a88cda540?w=500&h=700&fit=crop',
    artist: 'Bloomin Paints',
    year: 2024,
  },
  {
    id: '20',
    title: 'Urban Landscape',
    description: 'A compelling representation of contemporary city architecture and life.',
    story: 'Exploring the beauty and complexity of the urban environment through artistic expression.',
    price: 39000, // INR
    category: 'Urban',
    medium: 'Acrylic on Canvas',
    dimensions: { width: 30, height: 34, unit: 'inches' },
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1561132012-4e5b7c5b9c3e?w=500&h=700&fit=crop',
    artist: 'Bloomin Paints',
    year: 2024,
  },
]

// Format price for display
export function formatPrice(priceInINR: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(priceInINR)
}

// Calculate custom request price with 30% markup
export function calculateCustomRequestPrice(basePrice: number): number {
  return Math.round(basePrice * 1.3)
}
