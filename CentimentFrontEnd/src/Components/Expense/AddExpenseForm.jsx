import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { API_PATHS, BASE_URL } from '../../utilities/apipath';

const AddExpenseForm = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    date: '',
    icon: ''
  });
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmojiSelect = (emojiObject) => {
    setFormData({ ...formData, icon: emojiObject.emoji });
    setShowEmojiPicker(false); // Close picker after selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category || !formData.amount || !formData.date || !formData.icon) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}${API_PATHS.EXPENSE.ADD_EXPENSE}`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Expense added successfully');
        onAddExpense(data);
        setFormData({ category: '', amount: '', date: '', icon: '' }); // Reset form
      } else {
        alert(data.message || 'Failed to add expense');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding expense.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-5 shadow-md rounded-lg">
       {/* Icon Input with Emoji Picker */}
       <div className="relative">
        <label className="block text-sm font-medium text-gray-700">Icon</label>
        <div className="flex items-center">
          <input
            type="text"
            name="icon"
            value={formData.icon}
            readOnly
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            placeholder="Click to select emoji"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 cursor-pointer"
          />
          <button
            type="button"
            className="ml-2 px-3 py-2 bg-gray-200 rounded-md"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            😀
          </button>
        </div>

        {showEmojiPicker && (
          <div className="absolute z- mt-2">
            <EmojiPicker onEmojiClick={handleEmojiSelect} />
          </div>
        )}
      </div>
      {/* Category Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter expense category"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
        />
      </div>

      {/* Amount Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Amount (₹)</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
        />
      </div>

      {/* Date Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
        />
      </div>

     

      {/* Submit Button */}
      <div className="text-right">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-md hover:bg-red-800 transition"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Expense'}
        </button>
      </div>
    </form>
  );
};

export default AddExpenseForm;
