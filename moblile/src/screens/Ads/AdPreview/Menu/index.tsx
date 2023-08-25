import { HStack, useTheme } from 'native-base';
import { Button } from '@components/Button';
import { ArrowLeft, Tag } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useAdPreview } from '@screens/Ads/AdPreview/useAdPreview';

export const Menu = () => {
  
  const {navigate} = useNavigation<AppNavigatorRoutesProps>();
  const {isPushing, handlePublish} = useAdPreview();
  const {colors} = useTheme();
  return (
    <HStack
      position="fixed"
      bg="gray.700"
      pt={5}
      pb={7}
      px={5}
      alignItems="center"
      justifyContent="space-between"
      space={10}
    >
      <Button
        maxW="45%"
        title="Voltar e editar"
        type="GRAY"
        isDisabled={isPushing}
        onPress={() => navigate('adCreate')}
        startIcon={<ArrowLeft size={16} color={colors.gray['200']}/>}
      />
      <Button
        maxW="45%"
        title="Publicar"
        isLoading={isPushing}
        onPress={handlePublish}
        startIcon={<Tag size={16} color={colors.gray['600']}/>}
      />
    </HStack>
  );
};
