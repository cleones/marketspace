import { useState } from 'react';
import { Box, Text, useTheme } from 'native-base';
import MaskInput, { MaskInputProps} from 'react-native-mask-input';

import { ShowPasswordIcon } from '@components/ShowPasswordIcon';

type Props = MaskInputProps & {
  errorMessage?: string | null;
  showPasswordIcon?: boolean;
}
// export const Input = ({errorMessage = null, isInvalid, ...rest}: Props) => {
//   const invalid = !!errorMessage || isInvalid;
//   return (
//     <FormControl isInvalid={invalid} mb={4}>
//       <NativeBaseInput
//         bg="gray.700"
//         h={12}
//         w="full"
//         px={2}
//         borderWidth={0}
//         fontSize="md"
//         fontFamily="body"
//         color="gray.200"
//         _disabled={{
//           opacity: 0.5,
//           bg: 'gray.600'
//         }}
//         isInvalid={invalid}
//         _invalid={{
//           borderWidth: 1,
//           borderColor: 'red.500'
//         }}
//         placeholderTextColor="gray.400"
//         _focus={{
//           bg: 'gray.700',
//           borderWidth: 1,
//           borderColor: 'gray.300'
//         }}
//
//         {...rest}
//       />
//
//       <FormControl.ErrorMessage _text={{color: 'red.500'}}>
//         {errorMessage}
//       </FormControl.ErrorMessage>
//     </FormControl>
//   );
// };

export const Input = ({errorMessage = null, showPasswordIcon = false, ...rest}: Props) => {
  const {colors} = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [show, setShow] = useState(false);
  const invalid = !!errorMessage;
  return (
    <Box w="full" mb={2} position="relative">
      <MaskInput
        autoCapitalize="none"
        
        style={{
          height: rest.multiline ? 160 : 48,
          paddingHorizontal: 12,
          paddingVertical: 16,
          width: '100%',
          backgroundColor: colors.gray['700'],
          color: colors.gray['200'],
          borderRadius: 6,
          borderWidth: invalid || isFocused ? 1 : 0,
          borderColor: invalid ? colors.red['500'] : (isFocused ? colors.gray[300] : 'transparent')
        }}
        
        placeholderTextColor={colors.gray['400']}
        
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        
        secureTextEntry={showPasswordIcon && !show}
        
        {...rest}
      />
      {showPasswordIcon && (
        <Box position="absolute" right={0} top={0} mt={4}>
          <ShowPasswordIcon show={show} handleShow={() => setShow(old => !old)}/>
        </Box>
      )}
      <Text color="red.500" fontFamily="heading" fontSize="sm">
        {errorMessage}
      </Text>
    </Box>
  );
};
