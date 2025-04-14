import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form.tsx';
import { FieldPath, FieldValues } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select.tsx';
import { TASK_STATUS_VALUES } from '@/types/api/tasks.ts';
import { FieldProps } from '@/components/shared/EditTaskDialog/components/fieldProps.ts';

const StatusField = <TFieldValues extends FieldValues>({
    control,
}: FieldProps<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={'status' as FieldPath<TFieldValues>}
            render={({ field }) => (
                <FormItem className="grid w-full items-center gap-1.5">
                    <FormLabel>Статус</FormLabel>
                    <FormControl>
                        <Select
                            onValueChange={(e) => {
                                field.onChange(e);
                            }}
                            value={field.value}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Выберите статус" />
                            </SelectTrigger>
                            <SelectContent ref={field.ref}>
                                {TASK_STATUS_VALUES.map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default StatusField;
