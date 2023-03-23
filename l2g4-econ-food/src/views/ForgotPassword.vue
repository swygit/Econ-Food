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
