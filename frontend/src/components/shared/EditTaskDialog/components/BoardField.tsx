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
import { GetBoardsResponse, TaskOnBoard } from '@/types/api/board.ts';
import { FieldProps } from '@/components/shared/EditTaskDialog/components/fieldProps.ts';

interface BoardFieldProps<TFieldValues extends FieldValues>
    extends FieldProps<TFieldValues> {
    task?: TaskOnBoard;
    boards?: GetBoardsResponse;
}

const BoardField = <TFieldValues extends FieldValues>({
    control,
    task,
    boards,
}: BoardFieldProps<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={'boardId' as FieldPath<TFieldValues>}
            render={({ field }) => (
                <FormItem className="grid w-full items-center gap-1.5">
                    <FormLabel>Доска</FormLabel>
                    <FormControl>
                        <Select disabled={!!task} value={field.value}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Выберите доску" />
                            </SelectTrigger>
                            {boards && (
                                <SelectContent
                                    className="w-full"
                                    ref={field.ref}
                                >
                                    {boards.data.map((board) => (
                                        <SelectItem
                                            key={board.id}
                                            value={board.id.toString()}
                                        >
                                            {board.name}
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

export default BoardField;
