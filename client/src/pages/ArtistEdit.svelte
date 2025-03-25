<script>
    import Field from "../components/Field.svelte";
    import { authStore } from "../stores/tokenStore.js";
    import router from "page";
    import { onMount } from "svelte";

    export let params; // Route parameters passed from the router


    let artist; // The artist data
    let artistPromise; // Promise for fetching artist data

    // Form variables
    let firstname = "";
    let lastname = "";
    let style = "";
    let country = "";
    let description = "";

    let isLoggedIn, isAdmin;

    $: isLoggedIn = $authStore.isLoggedIn;
    $: isAdmin = $authStore.user?.isAdmin || false;

    // Ensure only authenticated admins can access this page
    onMount(() => {
        if (!isLoggedIn || !isAdmin) {
            alert("You are not authorized or don't have admin privileges to access this page.");
            router("/auth"); // Redirect to authentication page
        }
    });

    // Fetch the artist details by ID
    async function fetchArtist(artistID) {
        try {
            const response = await fetch(`http://localhost:3000/artists/${artistID}`);
            if (!response.ok) throw new Error("Failed to fetch artist data.");
            return await response.json();
        } catch (error) {
            console.error("Error fetching artist data:", error);
            throw error;
        }
    }

    // Initialize the artistPromise
    artistPromise = (async () => {
        const artistID = params?.id;
        if (!artistID) throw new Error("Artist ID is missing from the URL.");

        // Fetch the artist data
        artist = await fetchArtist(artistID);

        // Update form variables
        firstname = artist.firstname;
        lastname = artist.lastname;
        style = artist.style;
        country = artist.country;
        description = artist.description;

        return artist;
    })();

    // Handle form submission
    async function handleSubmit() {
        // Authorization check
        if (!isLoggedIn || !isAdmin) {
            return alert("You are not authorized or don't have admin privileges to perform this action.");
        }

        // Validate required fields
        if (!firstname || !lastname || !country || !style || !description) {
            return alert("All fields are required.");
        }

        const artistData = {
            firstname,
            lastname,
            country,
            style,
            description
        };

        try {
            const response = await fetch(`http://localhost:3000/artists/${artist.artistID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${$authStore.token}`
                },
                body: JSON.stringify(artistData),
            });

            if (response.ok) {
                alert("Artist updated successfully!");
                router("/artists"); // Redirect to  artist list
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Failed to update artist.");
            }
        } catch (error) {
            alert("An error occurred while updating the artist. Error:"+error);

        }
    }
</script>

<div class="container">
    <div class="form-section">
        <h2>Edit Artist</h2>

        {#await artistPromise}

            <p>Loading artist data...</p>
        {:then _}

            <Field bind:value={firstname} placeholder="Enter firstname" />
            <Field bind:value={lastname} placeholder="Enter lastname" />
            <Field bind:value={style} placeholder="Enter artist style" />
            <Field bind:value={country} placeholder="Enter artist country" />
            <Field bind:value={description} placeholder="Enter description" isTextArea={true} />

            <button type="submit" class="btn btn-black btn-radius btn-lg btn-submit" on:click={handleSubmit}>
                Update Artist
            </button>
        {:catch error}
            <p>Error loading artist data: {error.message}</p>
        {/await}
    </div>
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
    }

    .form-section {
        width: 40%;
        padding: 20px;
        border-radius: 10px;
        background-color: #fff;
    }

    h2 {
        font-size: 24px;
        text-align: center;
        margin-bottom: 20px;
    }

    @media (max-width: 768px) {
        .container {
            flex-direction: column;
            padding: 10px;
        }

        .form-section {
            width: 80%;
            padding: 15px;
        }

        h2 {
            font-size: 22px;
        }
    }

    @media (max-width: 480px) {
        .form-section {
            width: 90%;
            padding: 10px;
            margin-right: 20px;
        }

        h2 {
            font-size: 18px;
        }
    }
</style>
