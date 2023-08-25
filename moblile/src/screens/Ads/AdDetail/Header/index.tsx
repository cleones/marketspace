import { TouchableOpacity } from 'react-native';
import { HStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { ArrowLeft, PencilSimpleLine } from 'phosphor-react-native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

type Props = {
  showEditButton: boolean,
  adId?: string;
}
export const Header = ({showEditButton, adId}: Props) => {
  const {goBack, navigate} = useNavigation<AppNavigatorRoutesProps>();
  return (
    <HStack w="full" h={12} pb={5} px={10} alignItems={'center'} justifyContent="space-between">
      <TouchableOpacity onPress={goBack}>
        <ArrowLeft size={24}/>
      </TouchableOpacity>
      {showEditButton && adId && (
        <TouchableOpacity onPress={() => {
          navigate('adEdit', {
            id: adId,
          });
        }}>
          <PencilSimpleLine size={24}/>
        </TouchableOpacity>
      )}
    </HStack>
  );
};
