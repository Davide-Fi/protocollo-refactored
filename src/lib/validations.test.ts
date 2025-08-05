import { describe, it, expect } from 'vitest';
import { newsletterSchema, consultationSchema } from './validations';

describe('Newsletter Validation', () => {
  it('should validate correct newsletter input', () => {
    const validInput = {
      email: 'test@example.com',
      name: 'John Doe',
    };
    
    const result = newsletterSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('should reject invalid email', () => {
    const invalidInput = {
      email: 'not-an-email',
      name: 'John Doe',
    };
    
    const result = newsletterSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });

  it('should reject short names', () => {
    const invalidInput = {
      email: 'test@example.com',
      name: 'J',
    };
    
    const result = newsletterSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });
});

describe('Consultation Validation', () => {
  it('should validate correct consultation input', () => {
    const validInput = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      interest: 'nutrizione',
      message: 'This is a test message for consultation',
    };
    
    const result = consultationSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('should reject invalid interest type', () => {
    const invalidInput = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      interest: 'invalid-interest',
      message: 'This is a test message',
    };
    
    const result = consultationSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });

  it('should reject short messages', () => {
    const invalidInput = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      interest: 'nutrizione',
      message: 'Too short',
    };
    
    const result = consultationSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });
});