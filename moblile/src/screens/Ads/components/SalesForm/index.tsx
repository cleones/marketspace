import { Heading, Switch, VStack } from 'native-base';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Input } from '@components/Input';
import { Masks } from 'react-native-mask-input';
import { FormDataProps } from '@screens/Ads/context/userAdForm';

type Props = {
  control: Control<FormDataProps, any>,
  errors: FieldErrors<FormDataProps>,
}
export const SalesForm = ({control, errors}: Props) => {
  
  return (
    <VStack>
      <VStack>
        <Heading
          fontFamily="heading"
          fontSize="md"
          mb={4}
        >
          Venda
        </Heading>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Input
              placeholder="Valor do produto"
              mask={Masks.BRL_CURRENCY}
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.price?.message}
            
            />)}
          name="price"
        />
      </VStack>
      
      <VStack>
        <Heading
          fontFamily="heading"
          fontSize="md"
          mb={3}
        >
          Aceita troca?
        </Heading>
        <Controller
          control={control}
          render={({field: {value, onChange}}) => (
            <Switch
              onToggle={onChange}
              value={value}
              size="md"
              onTrackColor="blue.200"
            />
          )}
          name="accept_trade"
        />
      </VStack>
    </VStack>
  );
  
};
