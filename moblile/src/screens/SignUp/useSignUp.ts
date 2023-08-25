import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { validateTel } from '@utils/validation/tel';
import { formatWithMask, Masks } from 'react-native-mask-input';
import { api } from '@services/api';
import { useToast } from 'native-base';
import { useError } from '@hooks/useError';


const signUpSchema = yup.object().shape({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  tel: yup.string().required('Informe o telefone.').test('tel', '${path} não é um telefone valído', value => {
    return validateTel(value);
  }),
  password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
  password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('password')/*, null*/], 'A confirmação da senha não confere')
});

type FormDataProps = yup.InferType<typeof signUpSchema>;

export const useSignUp = () => {
  const toast = useToast();
  const {handleError} = useError();
  const {navigate} = useNavigation<AuthNavigatorRoutesProps>();
  
  const [photoSelected, setPhotoSelected] = useState<ImagePicker.ImagePickerResult>();
  const [isSaving, setIsSaving] = useState(false);
  
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });
  
  const handleGoBackSignIn = () => {
    navigate('signIn');
  };
  
  const handleCreateUser = async (data: FormDataProps) => {
    if (!photoSelected?.assets) return;
    
    const {unmasked: telUnmasked} = formatWithMask({
      text: data.tel,
      mask: Masks.BRL_PHONE,
    });
    
    const userFormData = new FormData();
    const fileExtension = photoSelected.assets[0].uri.split('.').pop();
    
    const photoFile = {
      name: `${data.name}.${fileExtension}`.replaceAll(' ', '_').toLowerCase(),
      uri: photoSelected.assets[0].uri,
      type: `${photoSelected.assets[0].type}/${fileExtension}`
      
    } as any;
    
    userFormData.append('avatar', photoFile);
    userFormData.append('name', data.name);
    userFormData.append('email', data.email);
    userFormData.append('tel', telUnmasked);
    userFormData.append('password', data.password);
    
    try {
      setIsSaving(true);
      await api.post('/users', userFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.show({
        title: 'usuario criado com sucesso!',
        placement: 'top',
        bgColor: 'green.700',
      });
      navigate('signIn');
      
    } catch (e) {
      console.log(e);
      handleError(e);
      setIsSaving(false);
    }
    
  };
  
  const handleUserPhotoSelect = async () => {
    try {
      const photo = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });
      
      if (photo.canceled) {
        return;
      }
      if (photo.assets[0].uri) {
        setPhotoSelected(photo);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return {
    isSaving,
    photoSelected,
    
    errors,
    control,
    handleSubmit,
    handleCreateUser,
    
    handleGoBackSignIn,
    handleUserPhotoSelect,
  };
};
