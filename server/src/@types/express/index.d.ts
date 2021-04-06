// @types/express/index.d.ts
import express = require('express'); // Import namespace

declare module 'express' {
  interface Request {
    user?: {
      id: string;
    };
  }
}
