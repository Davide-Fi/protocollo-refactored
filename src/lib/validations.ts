import { z } from 'zod';

// Newsletter validation
export const newsletterSchema = z.object({
  email: z.string().email('Email non valida').min(1, 'Email richiesta'),
  name: z.string()
    .min(2, 'Nome deve essere almeno 2 caratteri')
    .max(50, 'Nome troppo lungo')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Nome contiene caratteri non validi'),
});

// Consultation validation
export const consultationSchema = z.object({
  firstName: z.string()
    .min(2, 'Nome deve essere almeno 2 caratteri')
    .max(30, 'Nome troppo lungo')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Nome contiene caratteri non validi'),
  lastName: z.string()
    .min(2, 'Cognome deve essere almeno 2 caratteri')
    .max(30, 'Cognome troppo lungo')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Cognome contiene caratteri non validi'),
  email: z.string().email('Email non valida'),
  interest: z.enum(['nutrizione', 'integrazione', 'prevenzione', 'protocollo', 'altro']),
  message: z.string()
    .min(10, 'Messaggio deve essere almeno 10 caratteri')
    .max(1000, 'Messaggio troppo lungo'),
});

// Sunscreen product validation
export const sunscreenProductSchema = z.object({
  brand: z.string().min(1, 'Brand richiesto').max(100, 'Brand troppo lungo'),
  productName: z.string().min(1, 'Nome prodotto richiesto').max(200, 'Nome troppo lungo'),
  spf: z.number().int().min(1).max(100, 'SPF deve essere tra 1 e 100'),
  uva1Rating: z.enum(['excellent', 'good', 'moderate', 'poor']),
  uva2Rating: z.enum(['excellent', 'good', 'moderate', 'poor']),
  uvbRating: z.enum(['excellent', 'good', 'moderate', 'poor']),
  filters: z.object({
    chemical: z.array(z.string()).default([]),
    mineral: z.array(z.string()).default([]),
  }),
  textureRating: z.enum(['excellent', 'good', 'moderate', 'poor']).optional(),
  priceRange: z.enum(['budget', 'mid', 'premium']).optional(),
  availability: z.enum(['widely_available', 'limited', 'discontinued']).default('widely_available'),
  notes: z.string().max(1000, 'Note troppo lunghe').optional(),
});

// Sunscreen filter schema
export const sunscreenFilterSchema = z.object({
  brands: z.array(z.string()).default([]),
  spfRange: z.object({
    min: z.number().min(1).max(100),
    max: z.number().min(1).max(100),
  }).optional(),
  uva1Rating: z.array(z.enum(['excellent', 'good', 'moderate', 'poor'])).default([]),
  uva2Rating: z.array(z.enum(['excellent', 'good', 'moderate', 'poor'])).default([]),
  uvbRating: z.array(z.enum(['excellent', 'good', 'moderate', 'poor'])).default([]),
  priceRange: z.array(z.enum(['budget', 'mid', 'premium'])).default([]),
  availability: z.array(z.enum(['widely_available', 'limited', 'discontinued'])).default([]),
  searchTerm: z.string().optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type ConsultationInput = z.infer<typeof consultationSchema>;
export type SunscreenProductInput = z.infer<typeof sunscreenProductSchema>;
export type SunscreenFilterInput = z.infer<typeof sunscreenFilterSchema>;