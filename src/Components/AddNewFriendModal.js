import React from "react";
import Modal from "react-modal";

export default function AddNewFriendModal(props) {
  return (
    <Modal
      isOpen={props.isAddFriendModalOpen}
      contentLabel="Add New Friend"
      ariaHideApp={false}
      className="add-friend-modal modal-window"
    >
      <header className="modal-header add-friend-header">Add new Friend</header>
      <form className="add-friend-form">
        <div className="friend-name-input">
          <label for="friend-name">Name:</label>
          <input id="friend-name" type="text" required />
        </div>
        <button type="submit" className="friend-btn modal-btn">
          Add Friend
        </button>
        <br />
        <button
          type="button"
          className="close-modal close-friend-modal modal-btn"
        >
          Cancel
        </button>
      </form>
    </Modal>
  );
}

// className AddNewFriendModal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.addNewFriend = this.addNewFriend.bind(this);
//   }
//   addNewFriend(e) {
//     e.preventDefault();
//   }
//   render() {
//     return (
//       <Modal
//         isOpen={this.props.FriendModalOpen}
//         contentLabel="Add New Friend"
//         ariaHideApp={false}
//         className="add-friend-modal modal-window"
//       >
//         <header className="modal-header add-friend-header">Add new Friend</header>
//         <form onClick={this.addNewFriend} className="add-friend-form">
//           <div className="friend-name-input">
//             <label for="friend-name">Name:</label>
//             <input id="friend-name" type="text" required />
//           </div>
//           <button type="submit" className="friend-btn modal-btn">
//             Add Friend
//           </button>
//           <br />
//           <button
//             type="button"
//             className="close-modal close-friend-modal modal-btn"
//           >
//             Cancel
//           </button>
//         </form>
//       </Modal>
//     );
//   }
// }
