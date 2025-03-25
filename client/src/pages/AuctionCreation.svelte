<script>
    import Field from "../components/Field.svelte";
    import DropdownMenu from "../components/DropdownMenu.svelte";
    import {authStore} from "../stores/tokenStore.js";
    import router from "page";
    import {onMount} from "svelte";

    let artists = []; // Array to store artists
    let artistsPromise; // Promise for fetching artists

    // Form variables
    let title = "";
    let artistID = null;
    let yearOfCreation = "";
    let style = "";
    let material = "";
    let startPrice = "";
    let startDate = "";
    let endDate = "";
    let size = "";
    let selectedArtist = "";

    let isLoggedIn, isAdmin;

    $: isLoggedIn = $authStore.isLoggedIn;
    $: isAdmin = $authStore.user?.isAdmin || false;

    // Ensure only authenticated admins can access the page
    onMount(() => {
        if (!isLoggedIn || !isAdmin) {
            alert("You are not authorized or don't have admin privileges to access this page.");
            router("/auth"); // Redirect to authentication page
        }
    });

    // Fetch all artists
    async function fetchArtists() {
        const response = await fetch("http://localhost:3000/artists");
        if (!response.ok) throw new Error("Failed to fetch artists.");
        return await response.json();
    }

    // Fetch artists data using a promise
    artistsPromise = (async () => {
        artists = await fetchArtists();
        return artists;
    })();

    // Handle artist dropdown change
    function handleArtistChange(selected) {
        const artist = artists.find((a) => `${a.firstname} ${a.lastname}` === selected);
        if (artist) {
            artistID = artist.artistID;
        }
    }

    // Handle form submission
    async function handleSubmit() {
        if (!isLoggedIn || !isAdmin) {
            return alert("You are not authorized or don't have admin privileges to perform this action.");
        }

        // Validate required fields
        if (!title || !artistID || !yearOfCreation || !style || !material || !startPrice || !startDate || !endDate) {
            return alert("All fields are required.");
        }

        // Validate date range
        if (new Date(endDate) <= new Date(startDate)) {
            return alert("End date must be after the start date.");
        }

        // Validate starting price
        if (parseFloat(startPrice) <= 0) {
            return alert("Start price must be greater than zero.");
        }

        const paintingData = {
            title,
            artistID,
            yearOfCreation: parseInt(yearOfCreation),
            style,
            material,
            startPrice: parseFloat(startPrice),
            startDate,
            endDate,
            size,
        };

        try {
            const response = await fetch("http://localhost:3000/paintings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${$authStore.token}`, // Add Authorization header
                },
                body: JSON.stringify(paintingData),
            });

            if (response.ok) {
                alert("Auction created successfully!");
                resetForm();
                router("/");
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Failed to create auction.");
            }
        } catch (error) {
            alert("An error occurred while creating the auction.Error:"+error);

        }
    }

    // Reset form fields
    function resetForm() {
        title = "";
        artistID = null;
        yearOfCreation = "";
        style = "";
        material = "";
        startPrice = "";
        startDate = "";
        endDate = "";
        size = "";
        selectedArtist = "";
    }
</script>

<div class="container">
    <div class="form-section">
        <h2>Create Auction</h2>

        {#await artistsPromise}
            <p>Loading artists...</p>
        {:then artists}
            <Field bind:value={title} placeholder="Enter title" />

            <div class="dropdown-container">
                <DropdownMenu
                        options={artists.map((artist) => `${artist.firstname} ${artist.lastname}`)}
                        bind:selected={selectedArtist}
                        placeholder="Select artist"
                        onChange={handleArtistChange}
                />
            </div>

            <Field bind:value={yearOfCreation} type="number" placeholder="Enter year of creation" />
            <Field bind:value={style} placeholder="Enter style" />
            <Field bind:value={material} placeholder="Enter material" />
            <Field bind:value={size} placeholder="Enter size" />
            <Field bind:value={startPrice} type="number" placeholder="Enter start price" />
            <Field bind:value={startDate} type="date" placeholder="Enter start date" />
            <Field bind:value={endDate} type="date" placeholder="Enter end date" />

            <button type="submit" class="btn btn-black btn-radius btn-lg btn-submit" on:click={handleSubmit}>
                Create Auction
            </button>
        {:catch error}
            <p>Error loading artists: {error.message}</p>
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

    .dropdown-container {
        margin-bottom: 15px;
        margin-left: 20px;
        width: 100%;
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
