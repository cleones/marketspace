import { Heading, HStack, useTheme } from 'native-base';
import { Button } from '@components/Button';
import { WhatsappLogo } from 'phosphor-react-native';
import { Linking } from 'react-native';

type Props = {
  price: number;
  ownerTel: string;
}
export const Menu = ({ownerTel, price}: Props) => {
  
  const {colors} = useTheme();
  
  const handleContact = () => {
    const link = `whatsapp://send?text=hello&phone=${ownerTel}`;
    return Linking.openURL(link);
  };
  return (
    <HStack
      position="fixed"
      bg="gray.700"
      pt={5}
      pb={7}
      px={5}
      alignItems="center"
      justifyContent="space-between"
    >
      <HStack alignItems="baseline" bg="g">
        
        <Heading
          color="blue.500"
          fontSize="sm"
          fontFamily="heading"
        >
          R$
        </Heading>
        <Heading
          color="blue.500"
          fontSize="xxl"
          fontFamily="heading"
          ml={1}
        >
          {(price / 100).toFixed(2).replace('.', ',')}
        </Heading>
      </HStack>
      <Button
        maxW="50%"
        onPress={handleContact}
        title={'Entrar em Contato'}
        startIcon={<WhatsappLogo size={16} color={colors.gray['600']} weight="fill"/>}
      />
    </HStack>
  );
};
