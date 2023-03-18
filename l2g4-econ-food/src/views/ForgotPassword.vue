<template>
	<div class="container">
		<div class="center">
            <h1> Forgot password? </h1>
			<form>
				<input type="text" name="email" placeholder="Email">
				<input type="submit" value="Verify Email">
			</form>
		</div>
		<div class="topleft">
        	<img src='https://i.ibb.co/rkSWW2b/ECON-FOOD.png' class='icon'>
    	</div>
	</div>
</template>
<script>
export default {
    name: "ForgotPassword"
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Nunito Sans');
    .container {
        background-image: url('https://i.ibb.co/C69CYVs/Landing-Register-Login-Page.png');
        background-size: cover;
        position: fixed;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
    }
    .container::before {
        content: "";
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        background-color: rgba(0, 0, 0, 0.25)
    }
    h1 {
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
		color: #fff;
		font-size: 40px;
		font-family: 'Nunito Sans';
		text-shadow: 2px 2px #000;
	}
	form {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		padding: 20px;
		border-radius: 30px;
		box-shadow: 0px 0px 10px #999;
	}
	input[type="text"]{
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
	.icon {
        width: 200px;
        height: 200px;
    }
</style>
