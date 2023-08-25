import { Heading, HStack, useTheme } from 'native-base';

import { TouchableOpacity } from 'react-native';
import { Plus } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

export const Header = () => {
  const {navigate} = useNavigation<AppNavigatorRoutesProps>();
  const {colors: {gray}} = useTheme();
  
  return (
    <HStack w="full" h={12} alignItems="center" justifyContent="center">
      <Heading
        flex={1}
        textAlign="center"
        
        color="gray.100"
        fontSize="xl"
        fontFamily="heading"
      >
        Meus anúncios
      </Heading>
      
      <TouchableOpacity onPress={() => navigate('adCreate')}>
        <Plus size={24} color={gray['100']}/>
      </TouchableOpacity>
    </HStack>
  );
};
