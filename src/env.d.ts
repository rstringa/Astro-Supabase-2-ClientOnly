/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface User {
  email: string;
  // Añade otras propiedades del usuario si es necesario
}

declare namespace App {
  interface Locals {
    user?: User;
    title?: string;
  }
}
