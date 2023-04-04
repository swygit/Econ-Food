<template>
  <div class="order-chat-container">
    <div class="order-chat-topbar">
      <button class="order-chat-back-btn" @click="goBack">Back</button>
      <h1 class="order-chat-heading">{{ orderId }}</h1>
    </div>
    <div class="order-chat-messages">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="[    'order-chat-message',    isSentByCurrentUser(message) ? 'order-chat-message-sent' : 'order-chat-message-received'  ]"
      >
        <p>{{ message.content }}</p>
        <p class="order-chat-message-timestamp">{{ message.timestamp }}</p>
      </div>
    </div>
    <form @submit.prevent="sendMessage" class="order-chat-form">
      <div class="order-chat-input-container">
        <input type="text" v-model="messageInput" placeholder="Type a message" class="order-chat-input" />
        <button type="submit" class="order-chat-send-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { getFirestore, collection, query, where, getDocs, addDoc, orderBy } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import firebaseApp from "../firebase.js";

const db = getFirestore(firebaseApp);
const auth = getAuth();

export default {
  name: "OrderChat",
  props: {
    orderId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      user: null,
      messages: [],
      messageInput: "",
    };
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.getMessages();
      }
    });
    this.scrollToBottom();
  },
  methods: {
    scrollToBottom() {
      window.scrollTo(0, document.body.scrollHeight);
    },
    async getMessages() {
      const q = query(collection(db, "messages"), where("orderId", "==", this.orderId), orderBy("timestamp"));
      const querySnapshot = await getDocs(q);
      const messages = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      this.messages = messages;
    },
    async sendMessage() {
      const message = this.messageInput.trim();
      if (!message) {
        return;
      }
      try {
        await addDoc(collection(db, "messages"), {
          content: message,
          orderId: this.orderId,
          senderId: this.user.uid,
          timestamp: new Date().toISOString(),
        });
        this.messageInput = "";
        await this.getMessages(); // Call the getMessages method after a new message is added
      } catch (error) {
        console.error(error);
        alert("Failed to send message. Please try again later.");
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  computed: {
    currentUserId() {
      return this.user ? this.user.uid : null;
    },
    isSentByCurrentUser() {
      return (message) => message.senderId === this.currentUserId;
    },
  },
};
</script>

<style scoped>
.order-chat-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f5f5ef;
}

.order-chat-heading {
  font-size: 2.5rem;
  margin: 30px 0;
  text-align: center;
  text-shadow: 1px 1px #fff;
  color: #16703c;
}

.order-chat-messages {
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: 10px;
  padding: 0 20px;
  flex: 1;
  overflow-y: auto;
  margin-bottom: 70px;
}

.order-chat-message {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 80%;
  padding: 12px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  line-height: 1.4;
  margin-bottom: 8px;
}

.order-chat-message p {
  margin: 0;
  font-size: 16px;
  font-family: "Open Sans", sans-serif;
}

.order-chat-message-timestamp {
  font-size: 0.8rem;
  margin-top: 5px;
  color: #aaa;
  font-family: "Open Sans", sans-serif;
}

.order-chat-form {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0px -5px 15px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  left: 0;
}

.order-chat-input-container {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
}

.order-chat-input {
  flex: 1;
  height: 40px;
  padding: 5px 10px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  font-family: "Nunito Sans", sans-serif;
  background-color: #f5f5ef;
}

.order-chat-send-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: #16703c;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s ease;
}

.order-chat-send-btn:hover {
  background-color: #134c2e;
}

.order-chat-message-sent {
  align-self: flex-end;
  background-color: #def8c7;
}

.order-chat-message-received {
  align-self: flex-start;
  background-color: #fff;
}

.order-chat-back-btn{
background-color: #16703c;
color: #fff;
border: none;
border-radius: 5px;
padding: 10px;
font-size: 1rem;
font-weight: bold;
margin-right: 10px;
font-family: "Nunito Sans", sans-serif;
}

.order-chat-topbar {
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
background-color: #fff;
box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
padding: 10px;
position: sticky;
top: 0;
z-index: 1;
margin-bottom: 25px;
}

.order-chat-heading {
font-size: 2.5rem;
margin: 0;
text-align: center;
text-shadow: 1px 1px #fff;
color: #16703c;
flex: 1;
}

@media screen and (max-width: 767px) {
.order-chat-container {
padding-bottom: 80px;
}

.order-chat-messages {
margin-bottom: 110px;
}

.order-chat-form {
position: static;
width: 100%;
padding: 10px 20px;
background-color: #fff;
box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
margin-top: 20px;
}

.order-chat-input {
height: 50px;
font-size: 1.2rem;
}

.order-chat-send-btn {
width: 50px;
height: 50px;
font-size: 2rem;
margin-left: 20px;
}
}
</style>
