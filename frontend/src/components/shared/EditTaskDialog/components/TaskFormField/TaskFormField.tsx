import * as React from 'react';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form.tsx';
import { Control, ControllerRenderProps, FieldValues } from 'react-hook-form';

interface TaskFormFieldProps {
    control: Control;
    name: string;
    label: string;
    children: (
        field: ControllerRenderProps<FieldValues, string>,
    ) => React.ReactNode;
}

const TaskFormField = ({
    control,
    name,
    label,
    children,
}: TaskFormFieldProps) => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem className="grid w-full items-center gap-1.5">
                <FormLabel>{label}</FormLabel>
                <FormControl>{children(field)}</FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
);

export default TaskFormField;
