<script>
    import router from 'page';
    import Home from "./pages/Home.svelte";
    import About from "./pages/About.svelte";
    import Artists from "./pages/Artists.svelte";
    import Authentication from "./pages/Authentication.svelte";
    import UserProfile from "./pages/UserProfile.svelte";
    import Header from "./components/Header.svelte";
    import Footer from "./components/Footer.svelte";
    import './global.css';
    import AuctionCreation from "./pages/AuctionCreation.svelte";
    import ArtistCreation from "./pages/ArtistCreation.svelte";
    import AuctionEdit from "./pages/AuctionEdit.svelte";
    import ArtistEdit from "./pages/ArtistEdit.svelte";
    import Artist from "./pages/Artist.svelte";
    import AuctionPage from "./pages/AuctionPage.svelte";

    let page;
    let params;
    let currentRoute;

    router('/', (ctx) => {
        page = Home;
        currentRoute = ctx.pathname;
    });
    router('/about', (ctx) => {
        page = About;
        currentRoute = ctx.pathname;
        params = ctx;
    });
    router('/artists', (ctx) => {
        page = Artists;
        currentRoute = ctx.pathname;
        params = ctx;
    });
    router('/auth', (ctx) => {
        page = Authentication;
        currentRoute = ctx.pathname;
        params = ctx;
    });
     router('/profile', (ctx) => {
        page = UserProfile;
        currentRoute = ctx.pathname;
        params = ctx;
    });

      router('/create-auction', (ctx) => {
        page = AuctionCreation;
        currentRoute = ctx.pathname;
        params = ctx;
    });
    router('/create-artist', (ctx) => {
        page = ArtistCreation;
        currentRoute = ctx.pathname;
        params = ctx;
    });

 router('/edit-auction/:id', (ctx) => {
        page = AuctionEdit;
        currentRoute = ctx.pathname;
        params = ctx.params;
    });

 router('/edit-artist/:id', (ctx) => {
        page = ArtistEdit;
        currentRoute = ctx.pathname;
        params = ctx.params;
    });

  router('/artist-page/:id', (ctx) => {
        page = Artist;
        currentRoute = ctx.pathname;
        params = ctx.params;
    });


  router('/painting-page/:id', (ctx) => {
        page = AuctionPage;
        currentRoute = ctx.pathname;
        params = ctx.params;
    });














    router.start();
</script>

<div class="wrapper">
    <Header />
    <main class="content">
        <svelte:component this={page} {params}/>
    </main>
    <Footer/>
</div>

<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh; /* Full viewport height */
        width: 100%; /* Full width */
        margin: 0;
        padding: 0;
    }

    main {
        text-align: center;
        flex: 1; /* Push footer down */

        margin: 0 auto;
        width: 100%; /* Full width */
    }
</style>

