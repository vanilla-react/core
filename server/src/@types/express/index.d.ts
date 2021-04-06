// @types/express/index.d.ts
import express = require('express'); // Import namespace
import { IGithubDoneResponse, IJwtUser } from 'src/types';

// Now we can merge declarations
declare module 'express' {
  interface Request {
    user?: IGithubDoneResponse | IJwtUser;
  }
}
