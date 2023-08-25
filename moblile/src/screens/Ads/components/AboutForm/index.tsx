import { Heading, HStack, Radio, Text, useTheme, VStack } from 'native-base';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Input } from '@components/Input';

import { FormDataProps } from '@screens/Ads/context/userAdForm';

type Props = {
  control: Control<FormDataProps, any>,
  errors: FieldErrors<FormDataProps>,
}
export const AboutForm = ({control, errors}:Props) => {
  
  const {colors: {blue}} = useTheme();
  return (
    <VStack>
      <Heading
        fontFamily="heading"
        fontSize="md"
        mb={4}
      >
        Sobre o produto
      </Heading>
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <Input
            placeholder="Título do anúncio"
            autoCapitalize="none"
            onChangeText={onChange}
            value={value}
            errorMessage={errors.title?.message}
          />)}
        name="title"
      />
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <Input
            placeholder="Descrição do Producto"
            onChangeText={onChange}
            value={value}
            errorMessage={errors.description?.message}
            multiline
          />)}
        name="description"
      />
      <Controller
        name="is_new"
        control={control}
        render={({field: {onChange, value}}) => (
          <Radio.Group
            name="is_new"
            value={value}
            onChange={onChange}
          >
            <HStack space={5}>
              <Radio
                value="new"
                size="sm"
                _checked={{
                  borderColor: 'blue.200',
                }}
                _icon={{
                  color: 'blue.200',
                }}
              >
                <Text color="gray.200" fontSize={14}>
                  Produto novo
                </Text>
              </Radio>
              <Radio
                value="old"
                size="sm"
                colorScheme="blue"
                _checked={{
                  borderColor: 'blue.200',
                }}
                _icon={{
                  color: 'blue.200',
                }}>
                <Text color="gray.200" fontSize={14}>
                  Produto usado
                </Text>
              </Radio>
            </HStack>
          </Radio.Group>
        )}
      />
    </VStack>
  );
  
};
