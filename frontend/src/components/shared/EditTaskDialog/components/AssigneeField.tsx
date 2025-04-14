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
import { GetUsersResponse } from '@/types/api/users.ts';
import { FieldProps } from '@/components/shared/EditTaskDialog/components/fieldProps.ts';

interface AssigneeFieldProps<TFieldValues extends FieldValues>
    extends FieldProps<TFieldValues> {
    users?: GetUsersResponse;
}

const AssigneeField = <TFieldValues extends FieldValues>({
    control,
    users,
}: AssigneeFieldProps<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={'assigneeId' as FieldPath<TFieldValues>}
            render={({ field }) => (
                <FormItem className="grid w-full items-center gap-1.5">
                    <FormLabel>Исполнитель</FormLabel>
                    <FormControl>
                        <Select
                            onValueChange={(e) => {
                                field.onChange(e);
                            }}
                            value={field.value}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Выберите исполнителя" />
                            </SelectTrigger>
                            {users && (
                                <SelectContent ref={field.ref}>
                                    {users.data.map((user) => (
                                        <SelectItem
                                            key={user.id}
                                            value={user.id.toString()}
                                        >
                                            {user.fullName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            )}
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default AssigneeField;
