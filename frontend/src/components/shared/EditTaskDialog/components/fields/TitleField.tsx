import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { FieldPath, FieldValues } from 'react-hook-form';
import { FieldProps } from '@/components/shared/EditTaskDialog/components/fields/fieldProps.ts';

const TitleField = <TFieldValues extends FieldValues>({
    control,
}: FieldProps<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={'title' as FieldPath<TFieldValues>}
            render={({ field }) => (
                <FormItem className="grid w-full items-center gap-1.5">
                    <FormLabel>Название</FormLabel>
                    <FormControl>
                        <Input placeholder="Введите название" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default TitleField;
