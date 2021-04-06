// @types/express/index.d.ts
import { User } from '@prisma/client';
import express = require('express'); // Import namespace
import { IGithubDoneResponse } from 'src/types';

// Now we can merge declarations
declare module 'express' {
  interface Request {
    user?: IGithubDoneResponse;
  }
}
