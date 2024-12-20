<template>
    <header class="header">
      <div class="header__logo">
        <img src="@/assets/images/logo.png" alt="Falafel Logo" />
      </div>
      <nav class="header__nav">
        <ul>
          <li><router-link to="/">Hub</router-link></li>
          <li><router-link to="/flux-editor">Flux Editor</router-link></li>
          <li><router-link to="/preview">Preview</router-link></li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script setup>
  // Pas de logique complexe ici pour le moment, c’est juste un header statique.
  // Toutefois, si tu as besoin de données dynamiques (comme le nom d’utilisateur),
  // tu pourras injecter des propriétés ou accéder au store ici.
  </script>
  
  <style scoped>
  .header {
    display: flex;
    align-items: center;
    background: #333;
    color: #fff;
    height: 60px;
    padding: 0 1rem;
    justify-content: space-between; /* Logo à gauche, nav à droite */
  }
  
  .header__logo img {
    height: 40px;
    width: auto;
  }
  
  .header__nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 1.5rem;
  }
  
  .header__nav li {
    margin: 0;
    padding: 0;
  }
  
  .header__nav a {
    color: #fff;
    text-decoration: none;
    font-weight: 600;
  }
  
  .header__nav a:hover {
    text-decoration: underline;
  }
  </style>
  