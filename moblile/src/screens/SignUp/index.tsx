import { PencilSimpleLine } from 'phosphor-react-native';
import { Box, Center, Heading, Image, Pressable, ScrollView, Text, useTheme, VStack } from 'native-base';

import LogoSvg from '@assets/logo.svg';
import AvatarImg from '@assets/avatar.png';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useSignUp } from '@screens/SignUp/useSignUp';
import { Controller } from 'react-hook-form';
import { Masks } from 'react-native-mask-input';

export const SignUp = () => {
  
  const {colors} = useTheme();
  const {
    isSaving,
    photoSelected,
    
    errors,
    control,
    handleSubmit,
    handleCreateUser,
    
    
    handleGoBackSignIn,
    handleUserPhotoSelect
  } = useSignUp();
  
  return (
    <ScrollView bg="gray.600" px={10}>
      <VStack roundedBottom="3xl" pb={12}>
        <Center mt={20}>
          <LogoSvg width={60} height={40}/>
          <Center mt={8}>
            <Heading
              color="gray.100"
              fontSize="2xl"
              fontFamily="heading"
            >
              Boas vindas!
            </Heading>
            <Text
              mt={2}
              textAlign="center"
              color="gray.300"
              fontSize="sm"
              fontFamily="body"
            >
              Crie sua conta e use o espaço para comprar itens variados e vender seus produtos
            </Text>
          </Center>
        </Center>
        
        <Center>
          <VStack alignItems="center" justifyContent="center" w="full">
            <Box my={5} position="relative">
              
              <Image
                source={photoSelected?.assets ? {uri: photoSelected.assets[0].uri} : AvatarImg}
                w={32}
                h={32}
                alt="avatar"
                rounded="full"
                borderColor="blue.200"
                borderWidth={photoSelected ? 4 : 0}
              />
              <Pressable
                w={10}
                h={10}
                rounded="full"
                bg="blue.200"
                position="absolute"
                bottom={0}
                right={0}
                alignItems="center"
                justifyContent="center"
                onPress={handleUserPhotoSelect}
              >
                <PencilSimpleLine color={colors.white}/>
              </Pressable>
            </Box>
            <Controller
              control={control}
              render={({field: {value, onChange}}) => (
                <Input
                  placeholder="Nome"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.name?.message}
                />
              )}
              name="name"
            />
            
            <Controller
              control={control}
              render={({field: {value, onChange}}) => (
                <Input
                  placeholder="E-mail"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
              name="email"
            />
            
            <Controller
              control={control}
              render={({field: {value, onChange}}) => (
                <Input
                  placeholder="Telefone"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.tel?.message}
                  mask={Masks.BRL_PHONE}
                  autoCorrect={false}
                />
              )}
              name="tel"
            />
            
            <Controller
              control={control}
              render={({field: {value, onChange}}) => (
                <Input
                  placeholder="Senha"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                  showPasswordIcon
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoComplete="email"
                />
              )}
              name="password"
            />
            
            <Controller
              control={control}
              render={({field: {value, onChange}}) => (
                <Input
                  placeholder="Confirmar senha"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password_confirm?.message}
                  showPasswordIcon
                />
              )}
              name="password_confirm"
            />
          
          </VStack>
          <Button
            mt={8}
            title="Criar"
            type="BLACK"
            isLoading={isSaving}
            onPress={handleSubmit(handleCreateUser)}
          />
        
        </Center>
        <Center mt={12}>
          <Text color="gray.200" fontSize="sm" mb={4}> Já tem uma conta?</Text>
          <Button title="Ir para o login" type="GRAY" onPress={() => handleGoBackSignIn}/>
        </Center>
      </VStack>
    
    </ScrollView>
  );
};
