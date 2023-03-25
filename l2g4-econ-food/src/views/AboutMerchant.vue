<template>
<div class="container">

    <div class="row">

        <div class="col-left">
            <div class="topleft">
                <a href="/">
                    <img src="../assets/logo1.png" class="logo" alt="Logo">
                </a>
            </div>

            <v-col class="center">
                <h1>As a Merchant...</h1>

                <h2>POST</h2>
                <p>
                Upload a listing of your surplus food onto the marketplace
                </p>
                <br>
                <h2>CONNECT</h2>
                <p>
                Chat with a customer to arrange a self pickup time in store
                </p>
                <br>
                <h2>DELIVER</h2>
                <p>
                Excess food sold at a reduced price, alleviating loss incurred from food wastage
                </p>
                <br>
                <div class="topright">
                <router-link to="/login">
                    <button class="signin">Sign In / Register</button>
                </router-link>
                </div>
            </v-col>

        </div>

        <div class="col-right">
            <img src="../assets/about-merchant.png" alt="Image" class="half-image">
        </div>

    </div>
</div>
</template>

<script>
export default {
    name: "AboutMerchant"
}
</script>

<style scoped>  
@import url('https://fonts.googleapis.com/css?family=Nunito Sans');

.container {
    background-size: cover;
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: #f5f5ef;
}
/* .container::before { # what is this for?
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: #f5f5ef;
} */
.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-125%, -50%);
    text-align: left;
}

.fix { 
position:fixed; 
bottom:0px; 
left:50%;
height: 754px;
width: 754px;
z-index: 9999999;
text-align: center;
}

h1 {
    font-weight: normal;
    font-family: 'Nunito Sans';
    color: black;
    margin-bottom: 30px;
    font-size: 23px;
}

h2 {
    font-weight: normal;
    font-family: 'Nunito Sans';
    color: black;
    margin-bottom: 5px;
    font-size: 23px;
    font-weight: bold;
}

p {
    font-weight: normal;
    font-family: 'Nunito Sans';
    color: black;
    margin-bottom: 30px;
    font-size: 13.9px;
}

.logo {
    width: 180px;
    height: 90px;
}

.row {
display: flex;
}

.col-left {
flex: 1;
}

.col-right {
flex: 1;
}

.half-image {
  width: 50vw;
  height: 100vh;
}

.signin {
    background-color: #16703C;
    color: #fff;
    font-family: 'Nunito Sans';
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 20px;
    cursor: pointer;
}

.topright {
    /* position: fixed;
    top: 10px;
    right: 10px; */
    text-align: center;
}
</style>
