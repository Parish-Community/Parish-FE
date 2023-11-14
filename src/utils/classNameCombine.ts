type ClassName = string | null;

export const classNameCombine = (...classes: ClassName[]): string => classes.filter(Boolean).join(' ');
