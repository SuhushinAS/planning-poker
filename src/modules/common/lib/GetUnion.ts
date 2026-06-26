export type GetUnion<T extends Record<string, unknown>> = T[keyof T];
