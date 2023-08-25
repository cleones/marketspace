import { Heading, HStack, Text, useTheme, VStack } from 'native-base';
import { PaymentMethodDTO } from '@dtos/ProductDTO';
import { PaymentConfig } from '@components/ProductInfo/paymentConfig';

type Props = {
  paymentMethods: PaymentMethodDTO[];
  acceptTrade?: boolean;
}
export const ProductPaymentInfo = ({paymentMethods, acceptTrade}: Props) => {
  const {colors} = useTheme();
  
  return (
    <VStack mt={4}>
      <Heading
        color="gray.200"
        fontSize="sm"
        fontFamily="heading"
      >
        Aceita troca? {' '}
        <Text
          color="gray.200"
          fontSize="sm"
          fontFamily="body"
        >
          {acceptTrade ? 'Sim' : 'Não'}
        </Text>
      </Heading>
      <VStack mt={4}>
        <Heading
          color="gray.200"
          fontSize="sm"
          fontFamily="heading"
        >
          Meio de pagamento:
        </Heading>
        
        {paymentMethods.map((paymentMethod) => {
          const key = paymentMethod.key as keyof typeof PaymentConfig;
          const {icon: Icon} = PaymentConfig[key];
          return (
            <HStack mt={2} key={key} alignItems="center">
              <Icon size={18} color={colors.gray['100']}/>
              <Text
                ml={2}
                color="gray.200"
                fontSize="sm"
                fontFamily="body"
              >{paymentMethod.name}
              </Text>
            </HStack>
          );
        })}
      
      </VStack>
    
    </VStack>
  );
};
