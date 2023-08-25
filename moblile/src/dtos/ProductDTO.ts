import { UserDTO } from '@dtos/userDTO';

export type PaymentMethodDTO = {
  key: string;
  name: string;
};

export type ProductImageDTO = {
  path: string;
  id: string;
  isNew: boolean;
};

export type ProductDTO = {
  id: string;
  name: string;
  description: string;
  is_new: boolean,
  price: number;
  accept_trade: boolean;
  user_id: string;
  is_active: boolean;
  product_images: ProductImageDTO [];
  payment_methods: PaymentMethodDTO []
  user: UserDTO
};

export type ProductPreviewDTO = {
  name: string;
  description: string;
  is_new: boolean,
  price: number;
  accept_trade: boolean;
  product_images: {
    uri: string;
    type: 'image' | 'video' | undefined,
    isNew: boolean
  }[];
  payment_methods: string []
};
