<!--TODO start compositing home page using svelte.-->
<script>
    import Footer from "./common/Footer.svelte";
    import Navigation from './common/Navigation.svelte'
    import Home, {home} from "./pages/Home.svelte";
    import Contact, {contact} from "./pages/Contact.svelte";
    import About, {about} from "./pages/About.svelte";
    import Admin, {admin} from "./pages/Admin.svelte";
    import IconButton from "@smui/icon-button";
    import TopAppBar, {Row, Section, Title} from "@smui/top-app-bar";
    import {currentView} from './ViewStore';
//
    const panes = {};
    panes[home] = Home;
    panes[contact] = Contact;
    panes[about] = About;
    panes[admin] = Admin;

    let prominent = false;
    let dense = false;
    let secondaryColor = false;
</script>
<TopAppBar variant="static" {prominent} {dense} color={secondaryColor? 'secondary' : 'primary'}>
    <Row>
        <Section>
            <IconButton class="material-icons">menu</IconButton>
            <Title>PMDB</Title>
        </Section>
        <Section align="end" toolbar>
            <IconButton class="material-icons" aria-label="Download">file_download</IconButton>
            <IconButton class="material-icons" aria-label="Print this page">print</IconButton>
            <IconButton class="material-icons" aria-label="Bookmark this page">bookmark</IconButton>
        </Section>
    </Row>
</TopAppBar>
<!--<Navigation/>-->
<main>
    <div class="flexor-content">
        <svelte:component this={panes[$currentView]}/>
    </div>
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