<template>
  <Navbar />
  <router-view/>
</template>

<script>
  import Navbar from './components/Navbar.vue'

  export default {
    name: 'App',
    components: {
      Navbar
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&family=ZCOOL+XiaoWei&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
  body {
    color: #1E1E20;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'ZCOOL XiaoWei', sans-serif;
  }
  button {
    cursor: pointer;
  }
  .signup,
  .login {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
  .banner__img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    object-position: bottom;
  }
  .signup__form,
  .login__form {
    padding: 0 120px;
  }
  .signup__form h2,
  .login__form h2 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }
  .signup__form p,
  .login__form p {
    color: #424148;
    font-size: 16px;
    margin-bottom: 50px;
  }
  .input__field {
    background: #F5F7F9;
    border: none;
    border-radius: 6px;
    margin: 10px 0;
    display: flex;
    align-items: center;
    padding: 8px;
  }
  .input__field:focus {
    border: 1px solid #DBDCE0;
  }
  .input__field input,
  .input__field textarea {
    outline: none;
    display: block;
    width: 100%;
    height: 100%;
    border: none;
    background: none;
    color: #ABAFB5;
    font-size: 15px;
  }
  .input__field input::placeholder,
  .input__field textarea::placeholder {
    color: #ABAFB5;
  }
  .input__field textarea {
    height: 200px;
    resize: none;
  }
  .file__input label {
    color: #ABAFB5;
    display: flex;
    align-items: center;
    cursor: pointer; 
  }
  .file__input input {
    display: none;
  }
  .file__input img {
    width: 50px;
    margin-right: 10px;
  }
  .create,
  .edit {
    max-width: 600px;
    margin: 0 auto;
  }
  .input__icon {
    background: #fff;
    padding: 2px 4px 0 4px;
    border-radius: 5px;
    margin-right: 10px;
  }
  .input__icon img {
    width: 24px;
  }
  .input__button {
    display: block;
    border: none;
    width: 100%;
    padding: 15px 0;
    border-radius: 5px;
    background: #2093EE;
    color: #fff;
    margin-top: 20px;
    font-size: 1rem;
    text-transform: uppercase;
  }
  .option {
    margin: 25px 0;
  }
  #option__p,
  #option__small {
    font-weight: 500;
    color: #ABAFB5;
    margin: 0;
  }
  #option__p {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #option__p span {
    display: block;
    width: 200px;
    height: 1px;
    background: #ABAFB5;
    text-align: center;
  }
  #option__small {
    display: block;
    text-align: center;
  }
  #option__small a {
    color: #2093EE;
    text-decoration: none;
  }
  @media (max-width: 1200px) {
    .signup__form,
    .login__form {
      padding: 0 60px;
    }
  }
  @media (max-width: 960px) {
    .signup__form,
    .login__form {
      padding: 0 30px;
    }
  }
  @media (max-width: 780px) {
    .signup,
    .login{
      display: block;
    }
    .signup__form,
    .login__form {
      padding-top: 30px;
    }
    .banner__img {
      height: 250px;
      object-position: center;
    }
  }
  @media (max-width: 512px) {
    .signup__form h2,
    .login__form h2 {
      font-size: 2rem;
      margin-bottom: 10px;
    }
  }
</style>
