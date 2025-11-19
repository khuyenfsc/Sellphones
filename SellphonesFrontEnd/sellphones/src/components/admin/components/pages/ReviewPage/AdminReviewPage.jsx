import ReviewTable from "./components/ReviewTable";
const AdminReviewPage = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Quản lý Review</h1>
            </div>

            {/* Table */}
            <ReviewTable />
        </div>
    );
};

export default AdminReviewPage;
