<template>
	<div class="container">
		<div class="center">
		<h1> Sign In </h1>
			<form>
				<div class="buttons">
					<button :class="{active: isCustomer}" @click.prevent="toggle('customer')">Customer</button>
					<button :class="{active: !isCustomer}" @click.prevent="toggle('merchant')">Merchant</button>
				</div>
				<input type="text" name="email" placeholder="Email">
				<input type="password" name="password" placeholder="Password">
				<input type="submit" value="Sign in">
				<div class="links">
					<router-link to="/register">
						<div class="link">
							Register
						</div>
					</router-link>
					<router-link to="/forgotpassword">
						<div class="link">
							Forgot password?
						</div>
					</router-link>
				</div>
			</form>
		</div>
		<div class="topleft">
			<img src='https://i.ibb.co/rkSWW2b/ECON-FOOD.png' class='icon'>
		</div>
	</div>
</template>
<script>
import App from '../App.vue';
export default {
  components: { App },
    name: "Login",
	data() {
		return {
			// default option is Customer
			isCustomer: true
		}
	},
	methods: {
		toggle(client) {
      		if (client === 'customer') {
        		this.isCustomer = true;
      	} else {
        	this.isCustomer = false;
      		}
    	}
	}
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Nunito Sans');
	html, body {
		height: 100%;
	}
    .container {
		display: flex;
  		justify-content: center;
  		align-items: center;
        background-image: url('https://i.ibb.co/C69CYVs/Landing-Register-Login-Page.png');
        background-size: cover;
        position: fixed;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
    }
	.center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	h1 {
		color: #fff;
		font-size: 40px;
		font-family: 'Nunito Sans';
		text-shadow: 2px 2px #000;
		margin-bottom: 30px;
	}
	form {
		background-color: #fff;
		padding: 20px;
		border-radius: 30px;
		box-shadow: 0px 0px 10px #999;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	input[type="text"], input[type="password"] {
		display: block;
		width: 90%;
		margin-bottom: 10px;
		padding: 10px;
		border: none;
		border-radius: 30px;
		box-shadow: 0px 0px 5px #999;
		font-size: 16px;
		font-family: 'Nunito Sans';
	}
	input[type="submit"] {
		display: block;
		width: 95%;
		margin-bottom: 10px;
		padding: 10px;
		border: none;
		border-radius: 30px;
		box-shadow: 0px 0px 5px #999;
		background-color: #16703C;
		color: #fff;
		font-size: 16px;
		font-family: 'Nunito Sans';
		cursor: pointer;
	}
	.links {
		display: flex;
		justify-content: space-between;
		width: 70%;
		margin: 0 auto;
		margin-top: 20px;
  	}
	.link {
		display: block;
		text-align: center;
		margin-top: 20px;
		font-size: 16px;
		font-family: 'Nunito Sans'
	}
	button {
		font-family: 'Nunito Sans';
		font-size: 16px;
		height: 50px;
  		width: 150px;
		margin-left: 15px;
		margin-bottom: 15px;
		margin-right: 15px;
		border-radius: 15px;
		border-radius: 30px;
		box-shadow: 0px 0px 5px #999;
		cursor: pointer;
	}
	.active {
    	background-color: #16703C;
    	color: white;
  	}
	.topleft {
  		position: absolute;
  		top: 0;
  		left: 0;
	}
	.icon {
        width: 200px;
        height: 200px;
    }
</style>
