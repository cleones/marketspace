import { useTheme, VStack } from 'native-base';
import { Power, TrashSimple } from 'phosphor-react-native';

import { Button } from '@components/Button';
import { useOwnerActions } from '@screens/Ads/AdDetail/OwnerActions/useOwnerActions';


type Props = {
  isActive: boolean;
  adsId: string;
}
export const OwnerActions = ({isActive, adsId}: Props) => {
  const {colors: {gray}} = useTheme();
  const {
    isUpdating,
    isDeleting,
    
    handlerActiveAds,
    handlerRemoveAds
  } = useOwnerActions();
  
  return (
    <VStack>
      <Button
        isLoading={isUpdating}
        disabled={isDeleting}
        onPress={() => handlerActiveAds(adsId, isActive)}
        title={isActive ? 'Desativar anúncio' : 'Reativar anúncio'}
        type={isActive ? 'BLACK' : 'BLUE'} mb={2}
        startIcon={<Power size={16} color={gray['500']}/>}
      />
      <Button
        isLoading={isDeleting}
        disabled={isUpdating}
        onPress={() => handlerRemoveAds(adsId)}
        title="Excluir anúncio"
        type="GRAY"
        startIcon={<TrashSimple size={16} color={gray['200']}/>}
      />
    </VStack>
  );
};
