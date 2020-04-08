import React from "react";

export default function AddData(props) {
  const handleNewFriend = () => {
    console.log("boom");
  };
  return (
    <div class="add-data">
      <div class="add-friend">
        <button onClick={handleNewFriend} class="add-friend-btn add-new-btn">
          Add new Friend
        </button>
      </div>
      <div class="add-expense">
        <button class="add-expense-btn add-new-btn">Add new Expense</button>
      </div>
    </div>
  );
}
