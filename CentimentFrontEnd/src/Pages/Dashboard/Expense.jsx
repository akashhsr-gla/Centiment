import React, { useEffect, useState } from 'react';
import Dashboardlayout from '../../Components/dashboardlayout';
import ExpenseOverview from '../../Components/Expense/ExpenseOverview';
import axiosInstance from '../../utilities/axios';
import { API_PATHS } from '../../utilities/apipath';
import AddExpenseForm from '../../Components/Expense/AddExpenseForm';
import Modal from '../../Components/Layouts/Modal';
import ExpenseList from '../../Components/Expense/ExpenseList';
import DeleteAlert from '../../Components/Cards/DeleteAlert';
import UploadButton from '../../Components/Cards/UploadButton';
import PredictionCard from '../../Components/Cards/Dashboard/PredictionCard';

const Expense = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDelete, setOpenDelete] = useState({ show: false, data: null });
  const [apiError, setApiError] = useState("");

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Error fetching expenses", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async () => {
    fetchExpenseDetails();
  };
  
  const handleDeleteExpense = async () => {
    if (!openDelete.data) return;
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(openDelete.data));
      setExpenseData((prevData) => prevData.filter(expense => expense._id !== openDelete.data));
    } catch (error) {
      console.error("Error deleting expense:", error);
    } finally {
      setOpenDelete({ show: false, data: null });
    }
  };

  const handleDownloadData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expense_data.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading expense data:", error);
    }
  };
  const uploadExpense = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await axiosInstance.post(API_PATHS.EXPENSE.UPLOAD_EXPENSE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully!");
      setApiError(""); // Clear errors
    } catch (error) {
      console.error("Upload Error:", error);
      setApiError(error.response?.data?.message || "Failed to upload file. Try again.");
    }
  };
  
  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <Dashboardlayout activeMenu="Expense">
      <div>
        <UploadButton title="Upload Expense Data" onUpload={uploadExpense} apiError={apiError} />
      </div>
      <div className='my-5 mx-auto grid grid-cols-1 gap-6'>
        <ExpenseOverview transactions={expenseData} onAddExpense={() => setOpenAddExpenseModal(true)} />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <ExpenseList 
          transactions={expenseData} 
          onDelete={(id) => setOpenDelete({ show: true, data: id })}
          onDownload={handleDownloadData}
        />
        <PredictionCard type="expense" />
      </div>

      <Modal
        isOpen={openAddExpenseModal}
        onClose={() => setOpenAddExpenseModal(false)}
        title="Add Expense"
      >
        <AddExpenseForm onAddExpense={handleAddExpense} />
      </Modal>

      <Modal 
        isOpen={openDelete.show}
        onClose={() => setOpenDelete({ show: false, data: null })}  
        title="Delete Expense"
      >
        <DeleteAlert
          content="Are you sure you want to delete this expense?" 
          onDelete={handleDeleteExpense}
          onCancel={() => setOpenDelete({ show: false, data: null })} 
        />
      </Modal>
    </Dashboardlayout>
  );
};

export default Expense;
