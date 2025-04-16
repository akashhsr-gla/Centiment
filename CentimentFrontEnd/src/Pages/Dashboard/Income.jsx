import React, { useEffect, useState } from 'react';
import Dashboardlayout from '../../Components/dashboardlayout';
import IncomeOverview from '../../Components/Income/IncomeOverview';
import axiosInstance from '../../utilities/axios';
import { API_PATHS } from '../../utilities/apipath';
import Modal from '../../Components/Layouts/Modal';
import AddIncomeForm from '../../Components/Income/AddIncomeForm';
import IncomeList from '../../Components/Income/IncomeList';
import DeleteAlert from '../../Components/Cards/DeleteAlert';
import UploadButton from '../../Components/Cards/UploadButton';
import PredictionCard from '../../Components/Cards/Dashboard/PredictionCard';

const Income = () => {
  const [openAddIncomeModal, setopenAddIncomeModal] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDelete, setopenDelete] = useState({ show: false, data: null });
  const [apiError, setApiError] = useState("");

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async () => {
    fetchIncomeDetails();
  };
  
  const handleDeleteIncome = async () => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(openDelete.data));
      setIncomeData((prevData) => prevData.filter(income => income._id !== openDelete.data));
    } catch (error) {
      console.error("Error deleting income:", error);
    } finally {
      setopenDelete({ show: false, data: null });
    }
  };
  
  const handleDownloadData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'income_data.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading income data:", error);
    }
  };
 
  const uploadIncome = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstance.post(API_PATHS.INCOME.UPLOAD_INCOME, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully!");
      setApiError(""); // Clear errors if successful
    } catch (error) {
      console.error("Upload Error:", error);
      setApiError(error.response?.data?.message || "Failed to upload file. Try again.");
    }
  };
  
  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <Dashboardlayout activeMenu="Income">
      <div>
        <UploadButton title="Upload Income Data" onUpload={uploadIncome} apiError={apiError} />
      </div>
      <div className='my-5 mx-auto'>
        <IncomeOverview transactions={incomeData} onAddIncome={() => setopenAddIncomeModal(true)} />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <IncomeList 
          transactions={incomeData} 
          onDelete={(id) => setopenDelete({ show: true, data: id })}
          onDownload={handleDownloadData}
        />
        <PredictionCard type="income" />
      </div>
      
      <Modal
        isOpen={openAddIncomeModal}
        onClose={() => setopenAddIncomeModal(false)}
        title="Add Income"
      >
        <AddIncomeForm onAddIncome={handleAddIncome} />
      </Modal>

      <Modal 
        isOpen={openDelete.show}
        onClose={() => setopenDelete({ show: false, data: null })}  
        title="Delete Income"
      >
        <DeleteAlert 
          content="Are you sure you want to delete this income?" 
          onDelete={handleDeleteIncome}
          onCancel={() => setopenDelete({ show: false, data: null })} 
        />
      </Modal>
    </Dashboardlayout>
  );
};

export default Income;