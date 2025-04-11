import EditIssueDialog from '@/components/shared/EditIssueDialog/EditIssueDialog.tsx';

type IssueProps = {
    title: string;
};

const Issue = ({ title }: IssueProps) => {
    return (
        <EditIssueDialog
            issue={{ a: title }}
            triggerClassName="w-full cursor-pointer"
        >
            <div className="border-2 w-full p-2 text-left bg-white rounded shadow-sm">
                <span>{title}</span>
            </div>
        </EditIssueDialog>
    );
};

export default Issue;
