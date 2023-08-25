import { ProductDTO } from '@dtos/ProductDTO';
import { Center, FlatList, Text } from 'native-base';
import { ProductCard } from '@components/ProductCard';

type ListProductsProps = {
  products: ProductDTO[]
  myProducts?: boolean;
}
export const ListProducts = ({products, myProducts = false}: ListProductsProps) => {
  
  if (!products.length) {
    return (
      <Center flex={1}>
        <Text>Nenhum item para ser mostrado</Text>
      </Center>
    );
  }
  return products.length === 1 ? (
      <FlatList
        mt={8}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ProductCard data={item} showAvatarOwner={!myProducts}/>}
        data={products}
      />
    )
    : (
      <FlatList
        mt={8}
        key={'#'}
        keyExtractor={item => '#' + item.id}
        renderItem={({item}) => <ProductCard data={item} showAvatarOwner={!myProducts}/>}
        data={products}
        columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 20}}
        numColumns={2}
      />
    );
};
