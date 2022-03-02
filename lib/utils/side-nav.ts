import { SideNav } from '../routes';

/**
 * 生成key
 */
 export const generateKey = (data: SideNav, index: number): string => {
    return `${data.label}_${index}`;
  };