import { IImageProps, Image, Skeleton } from 'native-base';

type Props = IImageProps & {
  size: number;
  isLoading?: boolean
};
export const UserPhoto = ({size, isLoading = false, ...rest}: Props) => {
  return (
    <>
      {
        isLoading ?
          <Skeleton
            w={size}
            h={size}
            startColor="gray.500"
            endColor="gray.400"
            rounded="full"
          /> :
          <Image
            w={size}
            h={size}
            rounded="full"
            borderWidth={2}
            borderColor="blue.200"
            {...rest}
          />
      }
    </>
  );
};
