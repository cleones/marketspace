import { HStack, Input, View } from 'native-base';
import { MagnifyingGlass, Sliders } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';

export const InputFilter = () => {
  return (
    <HStack bg="gray.700" rounded="md" px={2} py={3} w="full">
      <Input
        placeholder="Buscar anúncio"
        placeholderTextColor="gray.400"
        borderWidth={0}
        flex={1}
        _focus={{
          bg: 'gray.700',
        }}
        mr={2}
      />
      
      <HStack alignItems="center" mr={2}>
        <TouchableOpacity>
          <MagnifyingGlass/>
        </TouchableOpacity>
        <View
          mx={3}
          borderLeftWidth={1}
          borderLeftColor="gray.400"
          opacity={0.5}
          h="full"
        />
        <TouchableOpacity>
          <Sliders/>
        </TouchableOpacity>
      </HStack>
    </HStack>
  );
  
};
