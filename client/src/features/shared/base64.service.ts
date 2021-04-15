import { Base64 } from '@/types';
import { Base64 as lib } from 'js-base64';

export class Base64Service {
  static ToTransport(content: string) {
    return lib.encode(content);
  }

  static ToReadable(content: Base64) {
    return lib.decode(content);
  }
}
