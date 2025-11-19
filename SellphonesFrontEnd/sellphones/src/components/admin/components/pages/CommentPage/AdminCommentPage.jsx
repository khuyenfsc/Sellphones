// AdminCommentPage.jsx
import CommentTable from "./components/CommentTable";
// import CreateCommentModal from "./components/CreateCommentModal"; 

const AdminCommentPage = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Quản lý Comment</h1>
      
            </div>

            {/* Table */}
            <CommentTable />
        </div>
    );
};

export default AdminCommentPage;
