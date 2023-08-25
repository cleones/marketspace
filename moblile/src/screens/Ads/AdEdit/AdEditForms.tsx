import { VStack } from 'native-base';
import { AboutForm } from '@screens/Ads/components/AboutForm';
import { SalesForm } from '@screens/Ads/components/SalesForm';
import { PaymentsForm } from '@screens/Ads/components/PaymentsForm';

import { ImageForm } from '@screens/Ads/components/ImageForm';
import { useAdEdit } from '@screens/Ads/context/AdEditContext';

export const AdEditForms = () => {
  const {
    control,
    errors,
    
    handleProductImageSelect,
    adPhotoSelected,
    
    paymentMethods,
    handleCheckBoxClick
  } = useAdEdit();
  
  return (
    <VStack px={10} mt={2} mb={10} space={6}>
      <ImageForm handleProductImageSelect={handleProductImageSelect} adPhotoSelected={adPhotoSelected}
                 messageError={errors.images?.message} isEditing/>
      <AboutForm control={control} errors={errors}/>
      <SalesForm control={control} errors={errors}/>
      <PaymentsForm paymentMethods={paymentMethods} handleCheckBoxClick={handleCheckBoxClick}
                    messageError={errors.payment_methods?.message}/>
    </VStack>
  );
};
