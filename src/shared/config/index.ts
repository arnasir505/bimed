export { useAppDispatch, useAppSelector } from './hooks';

export { store, persistor } from './store';

export type { RootState, AppDispatch } from './store';

export { theme } from './theme';

// @ts-expect-error declare module
export { locale } from './ru.js';
