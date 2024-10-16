<template>
    <div>
     
      <h1>Add Book</h1>
      <form @submit.prevent="addBook">
        <div>
          <label for="isbn">ISBN:</label>
          <input type="text" v-model="isbn" id="isbn" required />
        </div>
        <div>
          <label for="name">Name:</label>
          <input type="text" v-model="name" id="name" required />
        </div>
        <button type="submit">Add Book</button>
      </form>
  
  
      <h2>Update Book</h2>
      <form @submit.prevent="updateBook">
        <div>
          <label for="updateBookId">Book ID:</label>
          <input type="text" v-model="updateBookId" id="updateBookId" disabled />
        </div>
        <div>
          <label for="newName">New Name:</label>
          <input type="text" v-model="newName" id="newName" placeholder="Enter New Name" required />
        </div>
        <button type="submit">Update Book</button>
      </form>
  

      <h2>Delete Book</h2>
      <form @submit.prevent="deleteBook">
        <div>
          <label for="deleteBookId">Book ID:</label>
          <input type="text" v-model="deleteBookId" id="deleteBookId" placeholder="Enter Book ID" required />
        </div>
        <button type="submit">Delete Book</button>
      </form>
  
   
      <h2>Books with ISBN > 1000 (Limit 5)</h2>
      <ul>
        <li v-for="book in books" :key="book.id">
          ID: {{ book.id }} - Name: {{ book.name }} - ISBN: {{ book.isbn }}
          <button @click="populateUpdateForm(book)">Update</button>
          <button @click="deleteBook(book.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { collection, addDoc, doc, updateDoc, deleteDoc, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
  import db from '../firebase/init.js';
  
  export default {
    setup() {
    
      const isbn = ref('');
      const name = ref('');
  
      
      const updateBookId = ref('');
      const newName = ref('');
  
      
      const deleteBookId = ref('');
  
      
      const books = ref([]);
  
      const addBook = async () => {
        try {
          const isbnNumber = Number(isbn.value);
          if (isNaN(isbnNumber)) {
            alert('ISBN must be a valid number');
            return;
          }

          // 添加书籍到 Firestore
          const docRef = await addDoc(collection(db, 'books'), {
            isbn: isbnNumber,
            name: name.value
          });

          // 清空输入框
          isbn.value = '';
          name.value = '';
          alert('Book added successfully!');

          // 调用云函数将书籍名称和 ISBN 转换为大写
          await capitalizeBook(docRef.id);

          fetchBooks(); // 重新获取书籍列表
        } catch (error) {
          console.error('Error adding book: ', error);
        }
      };

      // 调用云函数来将书籍名称和 ISBN 转为大写
      const capitalizeBook = async (bookId) => {
        try {
          // 发送 POST 请求到云函数 URL，传递书籍ID
          await axios.post('https://capitalizebookdata-c7zqqngkdq-uc.a.run.app', { bookId });
          alert('Book data has been capitalized!');
        } catch (error) {
          console.error('Error capitalizing book data: ', error);
        }
      };

      
  
      
      const updateBook = async () => {
        if (!updateBookId.value) {
          alert('Please select a book to update');
          return;
        }
        try {
          const bookRef = doc(db, 'books', updateBookId.value);
          await updateDoc(bookRef, {
            name: newName.value
          });
          alert('Book updated successfully!');
          updateBookId.value = '';
          newName.value = '';
          fetchBooks();
        } catch (error) {
          console.error('Error updating book: ', error);
        }
      };
  
      
      const deleteBook = async (bookId) => {
        try {
          const bookRef = doc(db, 'books', bookId);
          await deleteDoc(bookRef);
          alert('Book deleted successfully!');
          fetchBooks(); 
        } catch (error) {
          console.error('Error deleting book: ', error);
        }
      };
  

      const populateUpdateForm = (book) => {
        updateBookId.value = book.id;
        newName.value = book.name;
      };
  
  
      const fetchBooks = async () => {
        try {
          const q = query(
            collection(db, 'books'),
            where('isbn', '>', 1000),
            orderBy('isbn'),
            limit(5)
          );
          const querySnapshot = await getDocs(q);
          const booksArray = [];
          querySnapshot.forEach((doc) => {
            booksArray.push({ id: doc.id, ...doc.data() });
          });
          books.value = booksArray;
        } catch (error) {
          console.error('Error fetching books: ', error);
        }
      };
  

      onMounted(() => {
        fetchBooks();
      });
  
      return {
        isbn,
        name,
        addBook,
        updateBookId,
        newName,
        updateBook,
        deleteBookId,
        deleteBook,
        books,
        populateUpdateForm
      };
    }
  };
  </script>