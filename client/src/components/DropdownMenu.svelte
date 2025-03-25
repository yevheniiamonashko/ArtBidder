<script>
     export let options = []; // The options to be displayed in the dropdown
     export let selected = null; // The selected option
     export let placeholder = "Select..."; // Placeholder text
     export let onChange; // Function to handle the change
     export let filter = false; // Flag for determining if this is a filter dropdown for styling

// Handle selection change
function handleChange(event) {
    const value = event.target.value;
    selected = value;
    if (onChange) {
    onChange(value);
}
}
</script>


<div class="container ">

    <select
            class:filter={filter}
            class:non-filter={!filter}
            on:change={handleChange}
            bind:value={selected}
            style="width: {filter ? '200px' : '100%'} "
    >
        <option value="" disabled selected >{placeholder}</option>
        {#each options as option}
            <option value={option}>{option}</option>
        {/each}
    </select>
</div>

<style>
    select {
        padding: 5px 16px; /* Smaller padding for less space on the sides */
        font-size: 16px;
        border-radius: 12px;
        border: 1px solid black;

        max-width: 100%; /* Ensure it doesn't exceed the container width */
        background-color: black;
        text-align: center; /* Center text */
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
    }
    select:focus {
        outline: none; /* Remove the white border */
    }

    /* Add a dark background if it's a filter dropdown */
    select.filter {
        background-color: #070707;
        color: white;
        border: none;
    }

    .container {
        display: flex;
        flex-direction: column;
        margin: 5px 16px;


        align-items: center; /* Center the dropdown */
    }


    select.non-filter {
        background-color: #f6f6f6;
        color: black;
        border: none;
        height: 40px;

    }




    /* Responsive styles */
    @media (max-width: 1200px) {
        select {
            width: 160px; /* Adjust width for medium screens */
        }
    }

    @media (max-width: 768px) {
        select {
            width: 100%; /* Full width on smaller screens */
        }
    }
</style>