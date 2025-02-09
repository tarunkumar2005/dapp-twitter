import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { uniqueNamesGenerator, Config, adjectives, animals } from 'unique-names-generator';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomUserName() {
  const config: Config = {
    dictionaries: [adjectives, animals],
    separator: " ",
    length: 2,
    style: "capital",
  };

  return uniqueNamesGenerator(config);
}