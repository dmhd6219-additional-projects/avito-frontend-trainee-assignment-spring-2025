import EditIssueDialog from '@/components/shared/EditIssueDialog/EditIssueDialog.tsx';

const Issue = () => {
    return (
        <EditIssueDialog
            issue={{ a: 'a' }}
            triggerClassName="w-full cursor-pointer"
        >
            <div className="border-2 w-full p-2 text-left">
                <span>Issue</span>
            </div>
        </EditIssueDialog>
    );
};

export default Issue;
