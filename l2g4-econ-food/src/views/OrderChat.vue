<template>
  <div class="order-chat-container">
    <h1 class="order-chat-heading">{{ orderId }}</h1>
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
      <input type="text" v-model="messageInput" placeholder="Type a message" class="order-chat-input" />
      <button type="submit" class="order-chat-send-btn">Send</button>
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
  },
  methods: {
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
  overflow-y: auto;
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
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 0 20px;
}

.order-chat-message {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 80%;
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  position: relative;
}

.order-chat-message p {
margin: 0;
font-size: 1rem;
font-family: "Nunito Sans", sans-serif;
}

.order-chat-message-timestamp {
font-size: 0.8rem;
margin-top: 5px;
color: #aaa;
}

.order-chat-form {
width: 100%;
display: flex;
align-items: center;
justify-content: space-between;
padding: 10px;
background-color: #fff;
box-shadow: 0px -5px 15px rgba(0, 0, 0, 0.1);
position: sticky;
bottom: 0;
}

.order-chat-input {
flex: 1;
height: 40px;
padding: 5px 10px;
font-size: 1rem;
border: 2px solid #b5e1b5;
border-radius: 5px;
font-family: "Nunito Sans", sans-serif;
}

.order-chat-send-btn {
width: 80px;
height: 40px;
border: none;
border-radius: 5px;
background-color: #16703c;
color: #fff;
font-size: 1rem;
font-weight: bold;
cursor: pointer;
margin-left: 10px;
font-family: "Nunito Sans", sans-serif;
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

</style>
