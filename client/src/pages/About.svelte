<script>

    import {onMount} from 'svelte';


    //page sections to display
    let sections = [
        {
            image: '/aboutImages/AboutArtist.jpg',
            text: "ArtBidder makes it easy to explore the works of a diverse range of talented artists from around the globe. Our collection includes masterpieces from iconic artists like Rembrandt and Van Gogh, as well as contemporary works from modern talents such as Liepke and Kryvolap.On our Artists page, you can discover all the information about the background, style, and other relevant details of every artist featured on our site.",
            side: "right"
        },
        {
            image: '/aboutImages/AboutPaintings.jpg',
            text: "We offer a wide selection of paintings across various styles, sizes, and materials. Whether you're looking for classic or contemporary works, we have something for every art lover. All available painting auctions are showcased on our homepage, giving you easy access to browse through our collection. On each painting's dedicated page, you'll find detailed information about the artwork.",
            side: "left"
        },
        {
            image: '/aboutImages/AboutBids.jpg',
            text: "The bidding process at ArtBidder is simple and transparent. Authenticated users can place their bids directly on each artwork's dedicated page. All bids placed for a painting are listed on this page, allowing users to see the current competition in real-time. Additionally, users can easily track all their winning bids on their user profile page, helping them stay informed about the total amount they need to pay for the paintings they have won.",
            side: "right"
        }
    ];


    let currentSectionIndex = 0;

    // Handle scroll and update section index for fading effect
    const handleScroll = () => {
        let scrollY = window.scrollY;

        // Adjust the logic to determine which section is currently visible
        if (scrollY > 600 && currentSectionIndex === 0) {
            currentSectionIndex = 1;
        } else if (scrollY > 1200 && currentSectionIndex === 1) {
            currentSectionIndex = 2;
        } else if (scrollY < 1200 && scrollY >= 600 && currentSectionIndex === 2) {
            currentSectionIndex = 1; // Show second section

            // Scroll up from second to first section
        } else if (scrollY < 600 && currentSectionIndex > 0) {
            currentSectionIndex = 0;
        }
    };

    onMount(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

</script>


<div class='about-beginning'>
    <h1 class="about-beginning-title">
        <span class="line-one">Discover Art</span><br/>
        <span class="line-two"> Place Bids Easily</span><br/>
        <span class="line-three">with ArtBidder</span>
    </h1>

</div>

<div class="about-container">
    {#each sections as section, index}
        <div class="section" class:fade-in={currentSectionIndex === index} class:fade-out={currentSectionIndex !== index}>
            <div class="section-separator"></div> <!-- Separator between sections -->
            {#if section.side === "left"}
                <div class="image-section">
                    <img src={section.image} alt="" class="dynamic-image">
                </div>
                <div class="text-section text-container">
                    <p>{section.text}</p>
                </div>
            {:else}
                <div class="text-section text-container">
                    <p>{section.text}</p>
                </div>
                <div class="image-section">
                    <img src={section.image} alt="" class="dynamic-image">
                </div>
            {/if}
        </div>
    {/each}
</div>


<style>

    .about-beginning {
        display: flex;
        justify-content: center;
        padding-left: 30px;
        margin-bottom: 20px;
    }

    .about-beginning-title {
        text-align: left;
        font-weight: bold;
        font-size: 40px;
    }

    .line-one {
        color: #0eb0ea;

    }

    .line-two {
        color: #0355ed;
    }

    .line-three {
        margin-left: 50px;
    }


    .about-container {
        display: flex;
        flex-direction: column;
        width: 100vw;
        min-height: 100vh; /* Ensure full viewport height */
        justify-content: space-between;
    }

    .section {
        display: flex;
        width: 100vw;
        height: 100vh;
        justify-content: space-between;
        align-items: stretch;
        overflow: hidden;
        position: relative;
        transition: opacity 0.5s ease-in-out; /* Smooth transition for fade effect */
        opacity: 0; /* Initially invisible */
    }

    .fade-in {
        opacity: 1; /* Make visible when in view */
    }

    .fade-out {
        opacity: 0; /* Make invisible when out of view */
    }


    .section-separator {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
        background-color: #333;
        z-index: 1;
    }


    .image-section, .text-section {
        width: 50vw;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .image-section img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .text-container {
        background-color: #95d6ea;
        padding: 40px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .text-section p {
        margin-top: 20px;
        font-size: 30px;
        color: #333;
        padding: 10px;
        word-wrap: break-word;


    }

    /* Sticky effect for the images */


    @media (max-width: 768px) {
        .about-beginning {
            padding-left: 20px;
        }

        .about-beginning-title {
            font-size: 30px;
        }

        .section {
            flex-direction: column;
            height: auto;
        }

        .image-section, .text-section {
            width: 100vw;
            height: auto;
        }

        .text-container {
            padding: 20px;
        }
    }


    @media (max-width: 480px) {
        .about-beginning {
            padding-left: 5px;
        }

        .about-beginning-title {
            font-size: 20px;
            margin-left: 30px;
        }

        .section {
            flex-direction: column;
            height: auto;
        }

        .section-separator {
            height: 30px;
            margin: 0 0;
        }

        .text-container {
            padding: 15px;
        }

        .text-section p {
            font-size: 20px;
            padding: 15px;
            word-wrap: break-word;


        }
    }


</style>
