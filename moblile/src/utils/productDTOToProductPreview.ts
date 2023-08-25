import { ProductDTO, ProductPreviewDTO } from '@dtos/ProductDTO';

export const productDTOToProductPreview = (product: ProductDTO) => {
  
  const productPreviewDTO: ProductPreviewDTO = {
    name: product.name,
    description: product.description,
    is_new: product.is_new,
    price: product.price,
    accept_trade: product.accept_trade,
    product_images: product.product_images.map(image => ({
      uri: image.path,
      type: 'image',
      isNew: false
    })),
    payment_methods: product.payment_methods.map(paymentMethod => paymentMethod.key),
  };
  
  return productPreviewDTO;
};
