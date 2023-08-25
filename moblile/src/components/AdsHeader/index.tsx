import { TouchableOpacity } from 'react-native';

import { ArrowLeft } from 'phosphor-react-native';
import { Heading, HStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

type Props = {
  title: string
}
export const AdsHeader = ({title}: Props) => {
  
  const {goBack} = useNavigation();
  
  return (
    <HStack w="full" h={12} pb={5} alignItems={'center'}>
      <TouchableOpacity onPress={goBack}>
        <ArrowLeft size={24}/>
      </TouchableOpacity>
      <Heading
        flex={1}
        textAlign="center"
        fontFamily="heading"
        fontSize="xl"
      >
        {title}
      </Heading>
      
    </HStack>
  );
};
