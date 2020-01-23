<!--TODO need to figure out what layout will look like-->
<script>
    let current = 'home';
</script>

<nav>
    <ul><!--TODO figure out what to put for navigation-->
        <li><button class:active={current === 'home'} on:click={() => current = 'home'}>Home</button></li>
        <li><button class:active={current === 'contact'} on:click={() => current = 'contact'}>Contact</button></li>
        <li><button class:active={current === 'about'} on:click={() => current = 'about'}>About</button></li>
    </ul>
</nav>

<style>
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #333;
    }

    li {
        float: left;
    }

    li button {
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        border: none;
    }

    /* Change the link color to #111 (black) on hover */
    li button:hover {
        background-color: #111;
        cursor: pointer;
    }
    .active {
        background-color: #4CAF50;
    }
</style>