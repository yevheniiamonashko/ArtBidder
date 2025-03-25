<script>
    import Field from "../components/Field.svelte";
    import {authStore} from "../stores/tokenStore.js";
    import router from "page";
    import {onMount} from "svelte";


    let firstname = "";
    let lastname = "";
    let style = "";
    let country = "";
    let description = "";
    let isLoggedIn, isAdmin;

    $: isLoggedIn = $authStore.isLoggedIn;
    $: isAdmin = $authStore.user?.isAdmin || false;


    onMount(() => {
        //forbid access to page to not logged in and not admin users
        if (!isLoggedIn || !isAdmin) {
            alert("You are not authorized or don't have admin privileges to access this page.");
            router("/auth");
        }
    });



    // Handle form submission
    async function handleSubmit() {
        if (!isLoggedIn || !isAdmin) {
            return alert("You are not authorized or don't have admin privileges to perform this action.");
        }


        if (!firstname || !lastname || !country || !style || !description) {

            return alert("All fields are required, including the image.");
        }


        const artistData = {
            firstname,
            lastname,
            country,
            style,
            description
        };

        try {
            const response = await fetch("http://localhost:3000/artists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${$authStore.token}` // Add the Authorization header
                },
                body: JSON.stringify(artistData),
            });

            if (response.ok) {
                alert("Artist created successfully!");
                resetForm();
                router('/artists')
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Failed to create artist.");
            }
        } catch (error) {
            alert("An error occurred while creating the artist.Error:"+error);

        }
    }

    function resetForm() {
        firstname = "";
        lastname = "";
        style = "";
        country = "";
        description = "";
    }


</script>

<div class="container">
    <div class="form-section">
        <h2>Create Artist</h2>

        <Field bind:value={firstname} placeholder="Enter firstname"/>
        <Field bind:value={lastname}  placeholder="Enter lastname"/>
        <Field bind:value={style} placeholder="Enter artist style"/>
        <Field bind:value={country} placeholder="Enter artist country"/>
        <Field bind:value={description} placeholder="Enter description"  isTextArea={true}/>

        <button type="submit" class="btn btn-black btn-radius btn-lg btn-submit" on:click={handleSubmit}>
            Create Artist
        </button>
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

    /* Media query for mobile phones */
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
