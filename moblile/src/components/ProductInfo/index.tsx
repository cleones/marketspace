import { ProductDTO } from '@dtos/ProductDTO';
import { VStack } from 'native-base';
import { ProductOwner } from '@components/ProductInfo/ProductOwner';
import { ProductDescription } from '@components/ProductInfo/ProductDescription';
import { ProductPaymentInfo } from '@components/ProductInfo/ProductPaymentInfo';

type Props = {
  product: ProductDTO;
}
export const ProductInfo = ({product}: Props) => {
  return (
    <VStack alignItems="flex-start" mt={2}>
      <ProductOwner user={product.user}/>
      <ProductDescription product={product}/>
      <ProductPaymentInfo paymentMethods={product.payment_methods} acceptTrade={product.accept_trade}/>
    </VStack>
  );
  
};
