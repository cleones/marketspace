import { useState } from 'react';
import { Box, Center, FlatList, HStack, Text, VStack } from 'native-base';
import { CaretDown, CaretUp } from 'phosphor-react-native';
import { Filter, useMyAds } from '@hooks/useMyAds';
import { Select } from '@components/Select';

import { Header } from './Header';
import { Loading } from '@components/Loading';
import { ListProducts } from '@components/ListProducts';

const filterOptions = [
  {
    value: 'ALL',
    label: 'Todos'
  },
  {
    value: 'ACTIVE',
    label: 'Ativos'
  },
  {
    value: 'INACTIVE',
    label: 'Inativos'
  },
];


export const MyAds = () => {
  const [filter, setFilter] = useState<Filter>(filterOptions[0].value as Filter);
  const {products, isLoading} = useMyAds(filter);
  
  return (
    <VStack pt={20} bg="gray.600" flex={1} px={10}>
      <Header/>
      <HStack alignItems="center" mt={5}>
        <Text
          color="gray.200"
          fontFamily="body"
          fontSize="sm"
          flex={1}
        >
          {`${products.length} anúncios`}
        </Text>
        <Select
          options={filterOptions}
          selectedValue={filter}
          onValueChange={value => setFilter(value as Filter)}
          w={150}
          dropdownCloseIcon={<CaretDown size={16} style={{marginRight: 10}}/>}
          dropdownOpenIcon={<CaretUp size={16} style={{marginRight: 10}}/>}
        />
      </HStack>
      {isLoading ? <Loading/> : <ListProducts products={products} myProducts={true}/>}
    </VStack>
  );
};
