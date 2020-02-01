<!--TODO start compositing home page using svelte.-->
<script lang="ts">
    import Footer from "./common/Footer.svelte";
    import Navigation from './common/Navigation.svelte'
    import Home, {home} from "./pages/Home.svelte";
    import Contact, {contact} from "./pages/Contact.svelte";
    import About, {about} from "./pages/About.svelte";
    import Admin, {admin} from "./pages/Admin.svelte";
    import TopAppBar from "@smui/top-app-bar";
    import {currentView} from './ViewStore';
//
    const panes = {};
    panes[home] = Home;
    panes[contact] = Contact;
    panes[about] = About;
    panes[admin] = Admin;

</script>
<TopAppBar/> <!--todo need to figure out how to use material UI-->
<Navigation/>
<main>
    <svelte:component this={panes[$currentView]}/>
</main>
<Footer/>

<style>
    main{
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }
    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }
    @media (min-width: 640px){
        main{
            max-width: none;
        }
    }
</style>