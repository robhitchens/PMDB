<!--TODO start compositing home page using svelte.-->
<script>
    import Footer from "./common/Footer.svelte";

    export let name;
    import Navigation from './common/Navigation.svelte'
</script>
<Navigation/>
<main>
    <slot>
        <em>no content was provided</em>
    </slot>
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