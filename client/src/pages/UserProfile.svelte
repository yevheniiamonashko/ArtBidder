<script>
    import {authStore, clearAuth} from "../stores/tokenStore.js";
    import router from 'page';
    import {onMount} from "svelte";

    let isAdmin = false;
    let email = '';
    let editingEmail = false;

    let userId = '';// Loading state
    let bidHistoryPromise;


    $: {
        if (!$authStore.isLoggedIn) {
            alert('You are not authorized');
            router('/auth'); // Redirect to the authentication page if not logged in
        }

    }
    authStore.subscribe(({ user, isLoggedIn }) => {
        if (isLoggedIn) {
            userId = user.id;
        }
    });

    onMount(() => {
        email = $authStore.user.email;
        isAdmin = $authStore.user.isAdmin;

    });
    async function fetchBidHistory(userId) {
        if (!userId) throw new Error("User ID is missing.");
        const response = await fetch(`http://localhost:3000/users/${userId}/winBids`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${$authStore.token}`,
            },
        });
        if (!response.ok) throw new Error("Failed to load bid history.");
        return await response.json();
    }

    bidHistoryPromise = (async () => {
        if (!userId) throw new Error("User ID is not available.");
        const data = await fetchBidHistory(userId);
        return data.bids;
    })();











    function toggleEditEmail() {
        editingEmail = !editingEmail;
    }


    async function saveEmail() {
        const userId = $authStore.user.userID;


        try {
            const response = await fetch(`http://localhost:3000/users/${userId}/email`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${$authStore.token}`
                },
                body: JSON.stringify({newEmail: email})
            });

            if (response.ok) {
                alert("Email updated successfully!");
                editingEmail = false;

                // Use `authStore.update` to safely modify the user's email in the store
                authStore.update(store => {
                    return {
                        ...store,
                        user: {
                            ...store.user,
                            email: email
                        }
                    };
                });
            } else {
                const errorData = await response.json();

                throw new Error(errorData.message || 'Failed to update email');

            }
        } catch (error) {
            alert(error.message || 'Error updating email');
        }
    }

    async function deleteAccount() {
        const userId = $authStore.user.userID;

        if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                const response = await fetch(`http://localhost:3000/users/${userId}`, {  // Updated URL
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${$authStore.token}`
                    }
                });

                if (response.ok) {
                    alert("Account deleted successfully.");
                    clearAuth();  // Clear auth state
                    router('/auth');  // Redirect to authentication page
                } else {
                    const errorData = await response.json();

                    throw new Error(errorData.message || 'Failed to delete account');
                }
            } catch (error) {
                alert(error.message || 'Error deleting account');
            }
        }
    }





</script>

<div class="profile-container">
    <h1>{isAdmin ? "Admin Profile" : "User Profile"}</h1>

    <div class="profile-content">
        <!-- User Information Section -->
        <div class:is-admin={isAdmin} class="user-info">
            <h2>User Information</h2>
            <div class:is-centered={!isAdmin} class="email-container">
                <p><strong>Email:</strong></p>
                {#if editingEmail}
                    <input type="text" bind:value={email} class="email-input"/>
                    <button on:click={saveEmail} class="btn btn-blue btn-sm">Save</button>
                    <button on:click={toggleEditEmail} class="btn btn-del btn-sm">Cancel</button>
                {:else}
                    <span>{email}</span>
                    <button on:click={toggleEditEmail} class="btn btn-edit btn-sm">Edit</button>
                {/if}
            </div>
        </div>

        <!-- Admin Links Section -->
        <div class="admin-links">
            <h2>Manage Actions</h2>
            {#if isAdmin}
                <a href="/create-auction" class="link-button">Add Auction</a>
                <a href="/create-artist" class="link-button">Add Artist</a>
            {/if}
            <button on:click={deleteAccount} class="btn btn-del">Delete Account</button>
        </div>
    </div>

    <div class="bid-history-section">
        <h2>Bid History</h2>
        {#await bidHistoryPromise}
            <p>Loading bid history...</p>
        {:then bidHistory}
            {#if bidHistory.length > 0}
                <table class="bid-history-table">
                    <thead>
                    <tr>
                        <th>Auction</th>
                        <th>Amount (€)</th>
                        <th>Bid Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each bidHistory as bid}
                        <tr>
                            <td>
                                <a href={`/painting-page/${bid.paintingID}`}>
                                    <button class="btn btn-black">Link to auction page</button>
                                </a>
                            </td>
                            <td>{bid.amount}</td>
                            <td>{new Date(bid.bidDate).toLocaleDateString()}</td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            {:else}
                <p>You didn't win any auctions yet.</p>
            {/if}
        {:catch error}
            <p>Failed to load bid history: {error.message}</p>
        {/await}
    </div>

</div>

<style>
    /* Profile container styling */
    .profile-container {
        max-width: 800px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        margin: 40px auto 40px;

    }

    /* Title styling */
    h1, h2 {
        text-align: center;
    }

    /* Two-column layout for profile content */
    .profile-content {
        display: flex;
        justify-content: space-between;
        gap: 40px; /* Increased space between sections */
        margin-top: 20px;
    }

    .user-info, .admin-links {

        padding: 20px;
        border-radius: 8px;
        flex: 1;
    }

    .user-info {
        padding: 20px;
        border-radius: 8px;
        flex: 1;
    }

    /* Admin-specific styling */
    .user-info.is-admin .email-container {
        text-align: left;
    }

    /* Center alignment for regular users */
    .user-info .email-container.is-centered {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-size: 18px;
    }

    /* Link styles similar to authentication page */
    .link-button {
        display: block;
        margin-bottom: 10px;
        color: #007bff;
        text-decoration: none;
    }

    .link-button:hover {
        text-decoration: none; /* Keep underline removed on hover */
        color: #0056b3;
    }





    /* Email edit field */
    .email-container {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 18px;
    }

    .email-input {
        padding: 5px;
        font-size: 16px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }


    @media (max-width: 768px) {
        .profile-content {
            flex-direction: column;
            gap: 20px;
        }
    }

    @media (max-width: 480px) {
        h1 {
            font-size: 24px;
        }

        h2 {
            font-size: 20px;
        }

        .email-input {
            width: 100%;
        }


    }

    .bid-history-section {
        margin-top: 30px;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 8px;
    }

    .bid-history-section h2 {
        font-size: 24px;
        margin-bottom: 10px;
    }

    .bid-history-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 15px;
    }

    .bid-history-table th, .bid-history-table td {
        padding: 10px;
        text-align: center;
        border: 1px solid #ddd;
    }

    .bid-history-table th {
        background-color: #f1f1f1;
    }

    .bid-history-table tr:hover {
        background-color: #f9f9f9;
    }




</style>
