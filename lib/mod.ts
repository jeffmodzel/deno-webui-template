/**
 * Shared library for the workspace
 */

export * from './config.ts';
export * from './logger.ts';

// Utility functions
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Shared functionality
export function greet(name: string): string {
  return `Hello, ${capitalize(name)}!`;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}
