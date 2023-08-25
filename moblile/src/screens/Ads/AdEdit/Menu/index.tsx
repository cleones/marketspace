import { HStack, useTheme } from 'native-base';
import { Button } from '@components/Button';
import { useAdEdit } from '@screens/Ads/context/AdEditContext';
import { ArrowLeft, Tag } from 'phosphor-react-native';


export const Menu = () => {
  const {handleSubmit, handleUpdate, handleCancelCreate} = useAdEdit();
  const {colors} = useTheme();
  return (
    <HStack
      space={4}
      position="fixed"
      w="full"
      h={100}
      bg="gray.700"
      alignItems="center"
      justifyContent="space-between"
      px={10}
    >
      <Button
        flex={1}
        title={'Cancelar'}
        type="GRAY"
        onPress={handleCancelCreate}
        startIcon={<ArrowLeft size={16} color={colors.gray['200']}/>}
      />
      
      <Button
        flex={1}
        title={'Atualiza'}
        type="BLUE"
        onPress={handleSubmit(handleUpdate)}
        startIcon={<Tag size={16} color={colors.gray['600']}/>}
      />
    </HStack>
  );
};
