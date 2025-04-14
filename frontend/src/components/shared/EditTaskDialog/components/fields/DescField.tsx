import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form.tsx';
import { FieldPath, FieldValues } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea.tsx';
import { FieldProps } from '@/components/shared/EditTaskDialog/components/fields/fieldProps.ts';

const DescField = <TFieldValues extends FieldValues>({
    control,
}: FieldProps<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={'description' as FieldPath<TFieldValues>}
            render={({ field }) => (
                <FormItem className="grid w-full items-center gap-1.5">
                    <FormLabel>Описание</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Введите описание" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default DescField;
