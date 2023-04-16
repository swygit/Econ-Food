<template>
  <CustomerNavigationBar v-show="!isMerchant" />
  <MerchantNavigationBar v-show="isMerchant" />
  <div class="order-chat-container" ref="chatContainer">
    <div class="order-chat-topbar">
      <button class="order-chat-back-btn" @click="goBack">Back</button>
      <h1 class="order-chat-heading">Order ID: <span class="black-text">{{ orderId }} </span> </h1>
    </div>
    <div class="order-chat-messages" ref="messagesContainer" style="overflow-y: auto; height: calc(100vh - 250px);">
      <div
            v-for="(message, index) in messages"
            :key="`message-${index}`"
            :class="[    'order-chat-message',    isSentByCurrentUser(message) ? 'order-chat-message-sent' : 'order-chat-message-received',    message.isImage ? 'order-chat-message-image' : ''  ]"
          >
            <template v-if="!message.isImage">
              <p>{{ message.content }}</p>
            </template>
            <template v-else>
              <img :src="message.content" class="order-chat-image" />
            </template>
            <p class="order-chat-message-timestamp">{{ formatDate(message.timestamp) }}</p>
      </div>

    </div>


    <form @submit.prevent="sendMessage" class="order-chat-form">
      <div class="order-chat-input-container">
        <input type="text" v-model="messageInput" placeholder="Type a message" class="order-chat-input" />
        <button type="submit" class="order-chat-send-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
        <label class="picture-upload-btn">
          <input type="file" ref="fileInput" accept="image/*" @change="onFileSelected"/> Upload Image
        </label>
      </div>
    </form>


  </div>
</template>

<script>
import { getFirestore, collection, query, where, getDocs, addDoc, orderBy ,getDoc, doc} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import firebaseApp from "../firebase.js";
import MerchantNavigationBar from "@/components/MerchantNavigationBar.vue";
import CustomerNavigationBar from "@/components/CustomerNavigationBar.vue";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
const storage = getStorage(firebaseApp);


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
      isMerchant: false,
      orderData: {},
      customerData: null,
      isPageVisible: true,
    };
  },
  components: {
    MerchantNavigationBar,
    CustomerNavigationBar,
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.getMessages();
        this.getMerchantUids();
        this.getOrderData();
      }
    });
    const observer = new IntersectionObserver(this.handleIntersection, {
      rootMargin: '0px',
      threshold: 1.0
    });
    observer.observe(this.$refs.chatContainer);
    this.$nextTick(() => {
      const container = this.$refs.messagesContainer;
      container.scrollTop = container.scrollHeight;
    });
    setInterval(() => {
      this.getMessages();
    }, 1000);
  },
  methods: {
    handleVisibilityChange() {
      this.isPageVisible = !document.hidden;
    },
    handleIntersection(entries) {
    const isVisible = entries[0].isIntersecting;
      this.isPageVisible = isVisible;
      if (isVisible) {
        this.getMessages();
      }
    },
    onFileSelected(event) {
      const file = event.target.files[0];
      this.uploadImage(file);
    },
    async uploadImage(file) {
      try {
        // create a storage reference for the image file
        const storageRef = ref(storage, "images/" + this.orderId + "/" + file.name);

        // upload the file to the storage reference
        const snapshot = await uploadBytes(storageRef, file);

        // get the download URL for the uploaded file
        const downloadURL = await getDownloadURL(snapshot.ref);

        // send the image URL as a message
        await addDoc(collection(db, "messages"), {
          content: downloadURL,
          orderId: this.orderId,
          senderId: this.user.uid,
          timestamp: new Date().toISOString(),
          isImage: true, // add a flag to indicate that this is an image message
        });

        await this.getMessages();
      } catch (error) {
        console.error(error);
        alert("Failed to upload image. Please try again later.");
      }
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      const hours = date.getHours();
      const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      const day = date.getDate();
      const month = date.getMonth() + 1; // getMonth() returns 0-based month, so add 1
      const year = date.getFullYear();
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    },
    async getMessages() {
      if (!this.isPageVisible) {
        return;
      }
      console.log("getting messages")
      const q = query(collection(db, "messages"), where("orderId", "==", this.orderId), orderBy("timestamp"));
      const querySnapshot = await getDocs(q);
      const messages = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      this.messages = messages;
    },
    async getMerchantUids() {
      const q = query(collection(db, "merchants"));
      const querySnapshot = await getDocs(q);
      const uids = querySnapshot.docs.map((doc) => {
        return doc.data().uid
      });
      console.log(uids)
      console.log(this.user.uid)
      this.isMerchant = uids.includes(this.user.uid);
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
    async getOrderData() {
      const docRef = doc(db, "orders", this.orderId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.orderData = docSnap.data();
        console.log(this.orderData.customerId);
      } else {
        console.log("No such document!");
      }
      if (this.orderData.customerId) {
        console.log(this.orderData.customerId)
        const q = query(collection(db, "customers"), where("uid", "==", this.orderData.customerId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          this.customerData = querySnapshot.docs[0].data();
        }
      }
      console.log(this.customerData)
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
  watch: {
    messages() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        container.scrollTop = container.scrollHeight;
      });
    }
},

};
</script>

<style scoped>
body {
  overflow-x: hidden;
}
.order-chat-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f5f5ef;
  overflow-x: hidden;
}

.order-chat-heading {
font-size: 2.5rem;
margin: 0;
text-align: center;
text-shadow: 1px 1px #fff;
color: #16703c;
position: fixed;
left: 41%;
}

.order-chat-messages {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 0 20px;
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
  max-width: 800px;
}
.order-chat-message-sent {
  align-self: flex-end;
  background-color: #def8c7;
}

.order-chat-message-received {
  align-self: flex-start;
  background-color: #fff;
}

.order-chat-back-btn {
background-color: #16703c;
color: #fff;
border: none;
border-radius: 5px;
padding: 10px 20px 10px 20px;
font-size: 2rem;
font-weight: bold;
margin-left: 5px;
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

}
.black-text {
  color: black;
}
.order-chat-message-image {
  max-width: 300px;
  max-height: 300px;
}

.order-chat-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  z-index: 1;
}

.order-chat-input-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.order-chat-input {
  flex: 1;
  height: 40px;
  padding: 5px 10px;
  font-size: 2rem;
  border: none;
  border-radius: 5px;
  font-family: "Nunito Sans", sans-serif;
  background-color: #f5f5ef;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.order-chat-send-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  background-color: #16703c;
  color: #fff;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 2px;
  padding-right: 2px;
  transition: background-color 0.3s ease;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.order-chat-send-btn svg {
  width: 2.8rem;
  height: 2.8rem;
}


.order-chat-send-btn:hover {
  background-color: #134c2e;
}

input[type="file"] {
    display: none;
}

.picture-upload-btn {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    margin: 2px 10px 2px 0px;
    font-size: 1.625rem;
    cursor: pointer;
}
</style>
