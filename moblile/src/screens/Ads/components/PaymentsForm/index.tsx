import { Checkbox, Heading, Text, VStack } from 'native-base';
import { useAdCreate } from '@screens/Ads/context/AdCreateContext';


type Props = {
  paymentMethods: string[],
  handleCheckBoxClick: (value: string) => void,
  messageError?:string,
}
export const PaymentsForm = ({paymentMethods, handleCheckBoxClick, messageError}:Props) => {
  return (
    <VStack space={4}>
      <Heading
        fontFamily="heading"
        fontSize="md"
      >
        Meios de pagamento aceitos
      </Heading>
      <VStack space={2}>
        <Checkbox
          isChecked={paymentMethods.includes('boleto')}
          onChange={() => handleCheckBoxClick('boleto')}
          borderColor="gray.400"
          rounded="sm"
          _checked={{
            bg: 'blue.200',
            borderColor: 'blue.200'
          }}
          value="boleto">
          <Text color="gray.200" fontSize={16}>
            Boleto
          </Text>
        </Checkbox>
        <Checkbox
          isChecked={paymentMethods.includes('pix')}
          onChange={() => handleCheckBoxClick('pix')}
          borderColor="gray.400"
          rounded="sm"
          _checked={{
            bg: 'blue.200',
            borderColor: 'blue.200'
          }}
          value="pix">
          <Text color="gray.200" fontSize={16}>
            Pix
          </Text>
        </Checkbox>
        <Checkbox
          isChecked={paymentMethods.includes('cash')}
          onChange={() => handleCheckBoxClick('cash')}
          borderColor="gray.400"
          rounded="sm"
          _checked={{
            bg: 'blue.200',
            borderColor: 'blue.200'
          }}
          value="cash">
          <Text color="gray.200" fontSize={16}>
            Dinheiro
          </Text>
        </Checkbox>
        <Checkbox
          isChecked={paymentMethods.includes('card')}
          onChange={() => handleCheckBoxClick('card')}
          borderColor="gray.400"
          rounded="sm"
          _checked={{
            bg: 'blue.200',
            borderColor: 'blue.200'
          }}
          value="card">
          <Text color="gray.200" fontSize={16}>
            Cartão de Crédito
          </Text>
        </Checkbox>
        <Checkbox
          isChecked={paymentMethods.includes('deposit')}
          onChange={() => handleCheckBoxClick('deposit')}
          borderColor="gray.400"
          rounded="sm"
          _checked={{
            bg: 'blue.200',
            borderColor: 'blue.200'
          }}
          value="deposit"
        >
          <Text color="gray.200" fontSize={16}>
            Depósito Bancário
          </Text>
        </Checkbox>
        {messageError && (
          <Text color="red.500" fontFamily="heading" fontSize="sm">
            {messageError}
          </Text>
        )}
      </VStack>
    </VStack>
  );
};
