<script>
    import AuctionStatus from "./AuctionStatus.svelte";
    import { authStore } from "../stores/tokenStore.js";
    import router from "page";
    export let imageURL = '';         // The image URL
    export let title = '';            // The title
    export let description = '';      // Material for paintings
    export let linkText = 'View details';  // Text for the link button
    export let linkUrl = '#';         // URL to the painting
    export let isPainting = false;    // Flag to check if it’s a painting
    export let currentBid = 0;        // The current bid
    export let auctionStartDate = ''; // The start date of the auction
    export let auctionEndDate = '';
    export let id;

    let isAdmin; // Check if the user is an admin
    let isLoggedIn; // Check if the user is logged in

    // Reactive subscription to authStore
    $: isAdmin = $authStore.user?.isAdmin || false;
    $: isLoggedIn = $authStore.isLoggedIn || false;

    $: linkUrl = isPainting ? `/painting-page/${id}` : `/artist-page/${id}`;


    function editItem() {
        if (isPainting) {
            router(`/edit-auction/${id}`); // Navigate to edit-auction with the painting ID
        } else {
            router(`/edit-artist/${id}`); // Navigate to edit-artist with the artist ID
        }
    }

    async function deleteItem() {
        if (confirm("Are you sure you want to delete this item?")) {
            try {
                const response = await fetch(
                    isPainting
                        ? `http://localhost:3000/paintings/${id}`
                        : `http://localhost:3000/artists/${id}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${$authStore.token}`,
                        },
                    }
                );
                if (response.ok) {
                    alert("Item deleted successfully!");
                    window.location.reload(); // Reload to reflect deletion
                } else {
                    alert("Failed to delete item.");
                }
            } catch (error) {
                console.error("Error deleting item:", error);
                alert("An error occurred while deleting the item.");
            }
        }
    }
</script>

<div class="content-col-3">
    <div class="content-card card {isPainting ? '' : 'card-artist'}">
        <div class="card__img-hold">
            <img src={`http://localhost:3000${imageURL}`} alt={title} class="card__img" />
        </div>
        <div class="card__text-hold">
            <a href={linkUrl} class="card__title-link">{title}</a>
            <p class="card__info">
                {#if isPainting}
                    <span class="centered-text"><strong>Material:</strong> {description}</span><br>
                    <span class="centered-text"><strong>Current Bid:</strong> €{currentBid}</span><br>
                    <span class="centered-text">  <AuctionStatus startDate={auctionStartDate} endDate={auctionEndDate} /></span>
                {:else}
                    <span class="centered-text"><strong>Style:</strong> {description}</span><br>
                {/if}
            </p>
        </div>
        <div class="card__actions">
            <a href={linkUrl} class="card__more">{linkText}</a>
        </div>
        <div class="manage-buttons-container">
        {#if isLoggedIn && isAdmin}

            <button on:click={editItem} class="btn btn-blue btn-sm">Edit</button>
            <button on:click={deleteItem} class="btn btn-del btn-sm">Delete</button>

        {/if}
        </div>

    </div>
</div>

<style>
    /* Flex container for cards */
    .content-col-3 {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
        align-items: flex-start;
        padding: 10px;
    }

    .content-col-3 .content-card {
        flex: 1 1 auto;
        max-width: 270px;
        min-width: 250px;
        background-color: #F9F8F8;
        border-radius: 10px;
        padding: 20px;
        margin: 10px;
    }

    .card__img-hold {
        margin-bottom: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card__img {
        border-radius: 10px;
        transition: 0.3s;
        max-width: 100%;
        max-height: 250px;
        object-fit: contain;
    }

    .card__img:hover {
        transform: scale(1.05);
    }

    .card__text-hold {
        display: flex;
        flex-direction: column;
        align-items: center; /* Center align the text block */
    }

    .card.card-artist .card__text-hold {
        align-items: center;
    }

    .card__title-link {
        display: inline-block;
        font-size: 18px;
        font-weight: 600;
        color: #180818;
        margin: 12px 0 10px;
        transition: 0.25s;
        text-decoration: none;
        text-align: center; /* Center align the title */
    }

    .card__title-link:hover {
        color: #1867F8;
    }

    .card__info {
        font-size: 12px;
        margin: 0 0 10px;
        text-align: center; /* Center align the info */
    }

    .centered-text {
        font-size: 14px; /* Smaller than the title but still prominent */
        font-weight: 400;
        display: block;
        text-align: center;

    }

    .card__actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 30px;
        width: 100%;
    }

    .card__more {
        color: #1867F8;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        height: 30px;
        font-weight: 500;
        font-size: 14px;
    }

    .manage-buttons-container{
        margin-top: 15px; /* Add space above the buttons */
        display: flex;
        justify-content: center;
        gap: 30px;
    }
</style>
