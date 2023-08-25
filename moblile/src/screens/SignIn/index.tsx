import { Box, Center, Text, VStack } from 'native-base';


import LogoSvg from '@assets/logo.svg';
import MarketspaceSvg from '@assets/marketspace.svg';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useSignIn } from '@screens/SignIn/useSignIn';
import { Controller } from 'react-hook-form';

export const SignIn = () => {
  
  const {
    handleCreateNewAccount,
    handleSignIn,
    handleSubmit,
    control,
    errors,
    isLoading
  } = useSignIn();
  
  
  return (
    <Box>
      <VStack roundedBottom="3xl" bg="gray.600" pb={12}>
        <Center mt={24}>
          <LogoSvg/>
          <VStack mt={8}>
            <MarketspaceSvg/>
            <Text
              color="gray.300"
              fontSize="sm"
              fontFamily="body"
            >
              Seu espaço de compra e venda
            </Text>
          </VStack>
        </Center>
        
        <Center mt={20} px={10} w="full">
          <VStack w="full">
            <Text
              color="gray.200"
              fontSize="sm"
              fontFamily="body"
              textAlign="center"
              mb={4}
            >
              Acesse sua conta
            </Text>
            
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />)}
              name="email"
            />
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <Input
                  placeholder="Senha"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                  showPasswordIcon
                />)}
              name="password"
            />
          </VStack>
          <Button
            title="Entrar"
            mt={8}
            isLoading={isLoading}
            onPress={handleSubmit(handleSignIn)}
          />
        </Center>
      </VStack>
      <Center mt={12} px={10}>
        <Text color="gray.200" fontSize="sm" mb={4}> Ainda não tem acesso?</Text>
        <Button title="Criar uma conta" type="GRAY" onPress={handleCreateNewAccount}/>
      </Center>
    </Box>
  );
};
