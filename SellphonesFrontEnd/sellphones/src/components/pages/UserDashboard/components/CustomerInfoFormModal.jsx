import { motion } from "framer-motion";
import { X } from "lucide-react";
import CustomerInfoForm from "./CustomerInfoForm";

const CustomerInfoFormModal = ({ visible, onClose, title, formData, setFormData, errors, setErrors, onSubmit, mode }) => {
    if (!visible) return null;

    return (
        <>
            <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />

            <motion.div
                className="fixed top-0 right-0 w-full sm:w-[420px] h-full bg-white shadow-2xl z-50 p-6 overflow-y-auto"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <CustomerInfoForm
                    formData={formData}
                    setFormData={setFormData}
                    errors={errors}
                    setErrors={setErrors}
                    onSubmit={onSubmit}
                    mode={mode}
                />
            </motion.div>
        </>
    );
};

export default CustomerInfoFormModal;
