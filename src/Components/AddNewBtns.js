import React from "react";

export default function AddData(props) {
  const handleNewFriend = () => {
    props.openModal();
  };
  return (
    <div className="add-data">
      <div className="add-friend">
        <button
          onClick={handleNewFriend}
          className="add-friend-btn add-new-btn"
        >
          Add new Friend
        </button>
      </div>
      <div className="add-expense">
        <button className="add-expense-btn add-new-btn">Add new Expense</button>
      </div>
    </div>
  );
}
