import { Heading, Text, VStack } from 'native-base';

export const Header = () => {
  return (
    <VStack w="full" pt={20} h={40} pb={5} px={10} alignItems={'center'} justifyContent="center" bg="blue.200">
      <Heading
        color="gray.700"
        fontFamily="heading"
        fontSize="md"
      >
        Pré visualização do anúncio
      
      </Heading>
      <Text
        color="gray.700"
        fontFamily="body"
        fontSize="sm"
      >
        É assim que seu produto vai aparecer!
      </Text>
    </VStack>
  );
};
