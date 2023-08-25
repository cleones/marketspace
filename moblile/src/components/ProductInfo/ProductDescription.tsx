import { Heading, HStack, Text, VStack } from 'native-base';
import { Tag } from '@components/ProductInfo/Tag';
import { ProductDTO } from '@dtos/ProductDTO';

type Props = {
  product: ProductDTO;
}
export const ProductDescription = ({product}: Props) => {
  
  return (
    <VStack mt={4}>
      <Tag isNew={product.is_new}/>
      <HStack alignItems="center" justifyContent="space-between" w="full" mt={4}>
        <Heading
          color="gray.100"
          fontSize="lg"
          fontFamily="heading"
        >
          {product.name}
        </Heading>
        <Heading
          color="blue.200"
          fontSize="sm"
          fontFamily="heading"
        >
          R$ {' '}
          <Heading
            color="blue.200"
            fontSize="xl"
            fontFamily="heading"
          >
            {(product.price / 100).toFixed(2).replace('.', ',')}
          </Heading>
        </Heading>
      </HStack>
      <Text
        color="gray.200"
        fontSize="sm"
        fontFamily="body"
        mt={2}
      >
        {product.description}
      </Text>
    
    </VStack>
  );
};
