<script>

    import { authStore, clearAuth } from "../stores/tokenStore.js";

    import router from 'page';

    function handleLogout() {

        clearAuth(); // Clear the auth store
        router('/'); // Redirect to homepage after logout
    }

</script>

<header class="header">
    <div class="container">

        <a href="/" class="header-left">
            <img src="/logo.png" alt="Logo" class="logo"/>
            <h1>ArtBidder</h1>
        </a>
        <div class="header-right">
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/artists">Artists</a></li>
                    {#if $authStore.isLoggedIn}
                        <li><a href="/profile">My Profile</a></li>
                        <li><a href="/logout" on:click|preventDefault={handleLogout}>Sign Out</a></li>
                    {:else}
                        <li><a href="/auth">Sign In</a></li>
                    {/if}




                </ul>
            </nav>
        </div>
    </div>
</header>

<style>
    .header {

        background-color: #ffffff;
        padding: 9px 0;
        border-bottom: 1px solid #ddd;
        width: 100%; /* Ensure header spans the full width */
    }

    .container {
        max-width: 1210px;
        padding: 0 30px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header .header-left {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #000;
        text-decoration: none;
    }

    .header .logo {
        width: 50px;
    }

    .header .header-right {
        display: flex;
        align-items: center;
    }

    nav ul {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        gap: 20px;
    }

    nav ul li a {

        text-decoration: none;
        color: #000;
        padding: 0.5rem 1rem;
        transition: color 0.3s ease;
    }

    nav ul li a:hover {
        color: #007bff;
    }



    @media (max-width: 768px) {
        .container {
            flex-direction: column;
        }

        .header-right {
            width: 100%;
            justify-content: center;
            margin-top: 10px;
        }

        nav ul {
            flex-direction: column;
            align-items: center;
        }
    }

    @media (max-width: 580px) {
        .logo {
            width: 40px;
        }

        .header-left h1 {
            font-size: 1.2rem;
        }

        nav ul li a {
            font-size: 14px;
            padding: 0.4rem 0.8rem;
        }
    }
</style>