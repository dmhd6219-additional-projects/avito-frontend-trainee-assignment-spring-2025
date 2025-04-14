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
import { TASK_PRIORITY_VALUES } from '@/types/api/tasks.ts';
import { FieldProps } from '@/components/shared/EditTaskDialog/components/fieldProps.ts';

const PriorityField = <TFieldValues extends FieldValues>({
    control,
}: FieldProps<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={'priority' as FieldPath<TFieldValues>}
            render={({ field }) => (
                <FormItem className="grid w-full items-center gap-1.5">
                    <FormLabel>Приоритет</FormLabel>
                    <FormControl>
                        <Select
                            onValueChange={(e) => {
                                field.onChange(e);
                            }}
                            value={field.value}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Выберите приоритет" />
                            </SelectTrigger>
                            <SelectContent ref={field.ref}>
                                {TASK_PRIORITY_VALUES.map((priority) => (
                                    <SelectItem key={priority} value={priority}>
                                        {priority}
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

export default PriorityField;
