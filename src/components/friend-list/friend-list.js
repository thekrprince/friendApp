import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as star } from '@fortawesome/free-regular-svg-icons';
import initialData from '../initial-data';
import Pagination from '../pagination/pagination';
import './friend-list.css';

const { friends } = initialData;

const FriendList = () => {
  const [addFriend, setAddFriend] = useState(friends);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  const indexOfLastFrnd = currentPage * postsPerPage;
  const indexOfFirstFrnd = indexOfLastFrnd - postsPerPage;
  const currentFrndList = addFriend.slice(indexOfFirstFrnd, indexOfLastFrnd);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let filteredFrnd = friends.filter((frnd) =>
        frnd.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setAddFriend([...filteredFrnd]);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  // Add friend when input is given and press enter key
  const addFriendHandler = (e) => {
    let personName = e.target.value;
    let obj = { name: personName, fav: false };
    var letters = /^[A-Za-z ]+$/;
    if (
      e.keyCode === 13 &&
      personName.trim() !== '' &&
      personName.match(letters)
    ) {
      setAddFriend([...addFriend, obj]);
      friends.push(obj);
    } else if (e.keyCode === 13 && !personName.match(letters)) {
      alert('Enter alphabets only');
    }
  };

  // Search friend
  const searchHandler = (e) => {
    setSearchInput(e.target.value);
  };

  // Favourite Friend
  const markFavHandler = (id) => {
    addFriend[id].fav = !addFriend[id].fav;
    console.log(currentPage + id);
    console.log(currentPage);
    setAddFriend([...addFriend]);
  };

  // Delete friend
  const deleteFriendHandler = (id) => {
    addFriend.splice(id, 1);
    friends.splice(id, 1);
    setAddFriend([...addFriend]);
  };

  // Pagination handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="friend-list-section">
      <div className="title">
        <span>
          <strong>Friends List</strong>
        </span>
      </div>
      <div className="add-search">
        <input
          type="text"
          placeholder="Enter your friend's name"
          onKeyDown={addFriendHandler}
          onChange={searchHandler}
        />
      </div>
      {currentFrndList.map((data, index) => {
        return (
          <div className="friend" key={index} id={index}>
            <div>
              <span>
                <strong>{data.name}</strong>
              </span>{' '}
              <br /> <span className="ht">is your friend</span>
            </div>
            <div className="icon">
              <FontAwesomeIcon
                icon={data.fav ? faStar : star}
                onClick={() => markFavHandler(index)}
              />
              <FontAwesomeIcon
                icon={faTrashAlt}
                onClick={() => deleteFriendHandler(index)}
              />
            </div>
          </div>
        );
      })}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={friends.length}
        paginate={paginate}
      />
    </section>
  );
};

export default FriendList;
