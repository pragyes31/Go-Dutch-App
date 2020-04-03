import React from "react";

const AddNewExpenseModal = () => (
  <div class="add-expense-modal modal-window">
      <form class="add-expense-form">
        <header class="modal-header add-expense-header">Add new Expense</header>
        <div class="expense-name-input input-div">
          <label for="expense-name">Expense Name</label>
          <input id="expense-name" type="text" required />
        </div>
        <div class="expense-amt-input input-div">
          <label for="expense-amount">Amount</label>
          <input id="expense-amount" type="number" required />
        </div>
        <div class="expense-partner-input input-div">
          <label for="expense-partner">Select expense partner</label>
          <select name="expense-partner" id="expense-partner" required>
            <option value="choose">-Choose a friend-</option>
          </select>
        </div>
        <div class="payer-input input-div">
          <label for="payer">Paid by:</label>
          <select name="payer" id="payer" required />
        </div>
        <button type="submit" class="expense-btn modal-btn">
          Add Expense
        </button>
        <br />
        <button type="button" class="close-modal close-expense-modal modal-btn">
          Cancel
        </button>
      </form>
    </div>
)

export default AddNewExpenseModal
