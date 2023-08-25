import { Box, Center, Heading, HStack, Text, useTheme, View, VStack } from 'native-base';

import { api } from '@services/api';

import { useAuth } from '@contexts/AuthContext';

import { UserPhoto } from '@components/UserPhoto';
import { Button } from '@components/Button';
import { Plus } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

export const Header = () => {
  const {user} = useAuth();
  const {colors} = useTheme()
  const {navigate} = useNavigation<AppNavigatorRoutesProps>();
  return (
    <HStack justifyContent="space-between">
      <HStack alignItems="center" mr={2}>
        <UserPhoto
          size={12}
          alt="foto usuário"
          source={{
            uri: `${api.defaults.baseURL}/images/${user.avatar}`
          }}
        />
        <VStack ml={2}>
          <Text
            fontSize="md"
            fontFamily="body"
            color="gray.100"
          >
            Boas vindas,
          </Text>
          <Heading
            fontSize="md"
            fontFamily="heading"
            color="gray.100"
          >
            {user.name}!
          </Heading>
        </VStack>
      </HStack>
      <Box flex={1} maxWidth="40%">
        <Button
          title="Criar anúncio"
          type="BLACK"
          onPress={() => navigate('adCreate')}
          startIcon={<Plus size={16} color={colors.gray['700']}/>}
        />
      </Box>
    </HStack>
  );
};
