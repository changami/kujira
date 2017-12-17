<template>
    <div id="nav">
        <ul>
            <li><router-link :to="{name: 'index'}">TOP</router-link></li>
            <li><router-link :to="{name: 'images'}">IMAGES</router-link></li>
        </ul>
    </div>
</template>

<style scoped>
    #nav ul li {
        display: inline;
    }

    #nav {
        background-color: #444;
        padding: 3px;
    }

    #nav ul {
        padding: 0;
        margin: 0;
    }

    #nav ul li {
        display: inline;
        margin-right: 1em;
    }

    #nav ul li a {
        font-family: "Trebuchet MS", sans-serif;
        text-decoration: none;
        color: #fff;
    }

    #nav ul li a:hover {
        border-bottom: dotted 1px #fff;
    }
</style>
