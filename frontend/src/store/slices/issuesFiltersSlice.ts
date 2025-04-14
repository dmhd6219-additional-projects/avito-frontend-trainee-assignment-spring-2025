import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskStatus } from '@/types/api/tasks';

interface FiltersState {
    status?: TaskStatus;
    boardId?: string;
    userId?: string;
}

const initialState: FiltersState = {
    status: undefined,
    boardId: undefined,
    userId: undefined,
};

const IssuesFiltersSlice = createSlice({
    name: 'issuesFilters',
    initialState,
    reducers: {
        setStatus(state, action: PayloadAction<TaskStatus | undefined>) {
            state.status = action.payload;
        },
        setBoardId(state, action: PayloadAction<string | undefined>) {
            state.boardId = action.payload;
        },
        setUserId(state, action: PayloadAction<string | undefined>) {
            state.userId = action.payload;
        },
        resetFilters() {
            return initialState;
        },
    },
});

export const { setStatus, setBoardId, setUserId, resetFilters } =
    IssuesFiltersSlice.actions;
export default IssuesFiltersSlice.reducer;
