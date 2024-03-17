import { persistentAtom } from '@nanostores/persistent';
import { atom } from 'nanostores';

export const projectId = atom('');
export const debug = persistentAtom<string>('debug', '0');


