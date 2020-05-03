<!--TODO need to figure out what layout will look like-->
<script lang="ts">
    import {currentViewKey} from '../contextKeys';
    import {home} from '../pages/HomeService';
    import {contact} from '../pages/Contact.svelte';
    import {about} from '../pages/About.svelte';
    import {admin} from '../pages/AdminService';
    import {currentView} from '../store/ViewStore';
    //export let current = home;//todo will need to determine view.
    function setCurrentView(selectedView){
        console.log('setting view to: ', selectedView);
        currentView.set(selectedView);
        console.log('Current view: ', $currentView);
    }
</script>

<nav>
    <ul><!--TODO figure out what to put for navigation-->
        <li>
            <button
                    class:active={$currentView === home}
                    on:click={() => setCurrentView(home)}
            >Home</button>
        </li>
        <li>
            <button
                    class:active={$currentView === contact}
                    on:click={() => setCurrentView(contact)}
            >Contact</button>
        </li>
        <li>
            <button
                    class:active={$currentView === about}
                    on:click={() => setCurrentView(about)}
            >About</button>
        </li>
        <li>
            <button
                    class:active={$currentView === admin}
                    on:click={() => setCurrentView(admin)}
            >Admin</button>
        </li>
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