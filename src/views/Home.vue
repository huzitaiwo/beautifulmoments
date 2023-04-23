<template>
<div class="container">
  <Showcase />
</div>
</template>

<script>
import Showcase from '../components/Showcase' 

export default {
  name: "Home",
  components: {
    Showcase
  }
};
</script>
<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px 20px;
  }
  .moments {
    border: 2px solid #DBDCE0;
    padding: 15px;
    border-radius: 15px;
  }
  .moments__text-small {
    display: flex;
    justify-content: space-between;
    align-content: center;
    color: #DBDCE0;
  }
  .moments h2 {
    margin-top: 15px;
  }
  .moments p {
    color: #DBDCE0;
    padding: 20px 0;
  }
  .moments img {
    width: 100%;
    border-radius: 15px 15px 0 0;
  }
  .moments__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
  .moments__button {
    display: inline-block;
    padding: 10px 30px;
    border-radius: 50px;
    margin-left: 15px;
    background: #fff;
    color: #0C1E45;
    border: 1px solid #0C1E45;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 500;
  }
  .moments__button a {
    text-decoration: none;
    color: #0C1E45;
    font-weight: 500;
  }

  @media (max-width: 830px) {
    .moments__grid {
      display: block;
    }
    .moments {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-bottom: 20px;
      align-items: center;
      gap: 20px;
    }
    .moments h2 {
      margin-top: 0;
    }
    .moments p {
      padding: 10px 0;
    }
    .moments img {
      border-radius: 15px 0 0 15px;
    }
  }
  @media (max-width: 750px) {
    .moments {
      display: block;
    }
    .moments h2 {
      margin-top: 15px;
    }
    .moments p {
      padding: 20px 0;
    }
    .moments img {
      border-radius: 15px 15px 0 0;
    }
  }
</style>
