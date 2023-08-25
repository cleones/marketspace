import { HStack } from 'native-base';
import { Button } from '@components/Button';
import { useAdCreate} from '@screens/Ads/context/AdCreateContext';

export const Menu = () => {
  const {handleSubmit, handleNext, handleCancelCreate} = useAdCreate();
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
      />
      
      <Button
        flex={1}
        title={'Avançar'}
        type="BLACK"
        onPress={handleSubmit(handleNext)}
      />
    </HStack>
  );
};
