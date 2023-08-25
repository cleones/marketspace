import uuid from 'uuid';
import { ProductDTO, ProductPreviewDTO } from '@dtos/ProductDTO';
import { UserDTO } from '@dtos/userDTO';

export const ProductPreviewToProductDTO = (preview: ProductPreviewDTO, user: UserDTO) => {
  
  const productDTO: ProductDTO = {
    id: uuid.v4(),
    name: preview.name,
    description: preview.description,
    is_new: preview.is_new,
    price: preview.price,
    accept_trade: preview.accept_trade,
    user_id: user.id,
    is_active: true,
    product_images: preview.product_images.map(image => ({
      path: image.uri,
      id: uuid.v4(),
      isNew: image.isNew
    })),
    payment_methods: preview.payment_methods.map(paymentMethod => ({
      name: paymentMethod,
      key: paymentMethod.toLowerCase().replace(' ', '_')
    })),
    user: user,
  };
  
  return productDTO;
};
