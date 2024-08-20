export interface ILocalizedString {
  en: string;
  ar: string;
}

export interface IProductOption {
  name: ILocalizedString;
  values: {
    en: string[];
    ar: string[];
  };
}

export interface IVariantOptions {
  [key: string]: ILocalizedString;
}

export interface IVariant {
  id: string;
  title: ILocalizedString;
  price: number;
  inventory_quantity: number;
  options: IVariantOptions;
  images: string[];
  color_hex: string;
}

export interface IProduct {
  title: ILocalizedString;
  description: ILocalizedString;
  price: number;
  variants: IVariant[];
  options: IProductOption[];
}
