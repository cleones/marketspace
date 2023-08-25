import { UserPhoto } from '@components/UserPhoto';
import { api } from '@services/api';
import { HStack, Text } from 'native-base';
import { UserDTO } from '@dtos/userDTO';

type Props = {
  user: UserDTO;
}
export const ProductOwner = ({user}: Props) => {
  return (
    <HStack alignItems="center">
      <UserPhoto
        size={8}
        alt="Imagem dono do produto"
        source={{
          uri: `${api.defaults.baseURL}/images/${user.avatar}`
        }}/>
      <Text
        color="gray.100"
        fontSize="sm"
        fontFamily="body"
        ml={2}
      >{user.name}</Text>
    </HStack>
  
  );
};
