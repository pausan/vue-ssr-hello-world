<template>
  <div id="app">
    <header class="header">
      <nav class="inner">
        <ul>
          <li> <router-link to="/hello">Hello</router-link> </li>
          <li> <router-link to="/world">World</router-link> </li>
        </ul>
      </nav>
    </header>

    <router-view class="view"></router-view>
  </div>
</template>