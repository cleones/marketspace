import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { ProductPreviewDTO } from '@dtos/ProductDTO';

const formSchema = yup.object({
  title: yup.string().required('Informe o Titulo.'),
  description: yup.string().required('Informe a descrição do produto.'),
  is_new: yup.string().required('Informe o tipo do produto.'),
  price: yup.string().required('Informe o preço do produto.'),
  accept_trade: yup.boolean().nonNullable().default(false),
  payment_methods: yup.array().required('Infromer pelomenos uma forma da pagamento')
    .min(1, 'O campo deve ter pelo menos um valor.')
    .of(yup.string()),
  images: yup.array().of(
    yup.object().shape({
      uri: yup.string(),
      type: yup.mixed().oneOf(['image', 'video', undefined]),
      isNew: yup.boolean()
    })
  ).required('Ieve ter pelo menos uma images')
    .test('min-length', 'Deve ter pelo menos uma images.', (value) => value && value.length > 0),
});

export type FormDataProps = yup.InferType<typeof formSchema>;

export const userAdForm = (product: ProductPreviewDTO) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors}
  } = useForm<FormDataProps>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      title: product.name || '',
      description: product.description || '',
      is_new: 'new',
      accept_trade: product.accept_trade,
      payment_methods: product.payment_methods,
      images: product.product_images
    }
  });
  
  useEffect(() => {
    if(!product.name) return;
    setValue('title', product.name);
    setValue('description', product.description);
    setValue('is_new', product.is_new ? 'new' : 'old');
    setValue('accept_trade', product.accept_trade);
    setValue('payment_methods', product.payment_methods);
    setValue('images', product.product_images);
    setValue('price', product?.price?.toString());
  }, [product]);
  
  return {
    handleSubmit,
    control,
    errors,
    setValue
  };
  
};
