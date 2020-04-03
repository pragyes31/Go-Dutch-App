import React from "react";
import Modal from "react-modal";

const AddNewFriendModal = () => (
  <Modal isOpen={true} contentLabel="Add New Friend">
    <h3>Modal</h3>
  </Modal>
);

export default AddNewFriendModal;

/*
  <div class="add-friend-modal modal-window">
    <header class="modal-header add-friend-header">Add new Friend</header>
    <form class="add-friend-form">
      <div class="friend-name-input">
        <label for="friend-name">Name:</label>
        <input id="friend-name" type="text" required />
      </div>
      <button type="submit" class="friend-btn modal-btn">
        Add Friend
      </button>
      <br />
      <button type="button" class="close-modal close-friend-modal modal-btn">
        Cancel
      </button>
    </form>
  </div>
  */
