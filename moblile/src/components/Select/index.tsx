import { ISelectProps, Select as NativeBaseSelect } from 'native-base';

type Props = ISelectProps & {
  options: {
    value: string;
    label: string;
  }[];
}
export const Select = ({options, ...rest}: Props) => {
  return (
    <NativeBaseSelect
      minWidth="100"
      {...rest}
    >
      {options.map(option => (
        <NativeBaseSelect.Item key={option.value} label={option.label} value={option.value}/>
      ))}
    
    
    </NativeBaseSelect>
  );
};
