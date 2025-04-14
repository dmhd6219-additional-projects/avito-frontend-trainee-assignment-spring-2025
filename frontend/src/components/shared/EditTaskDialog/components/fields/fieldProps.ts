import { Control, FieldValues } from 'react-hook-form';

export interface FieldProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
}
