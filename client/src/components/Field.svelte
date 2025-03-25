<script>
    export let type = 'text'; // Type of input (text, email, password, etc.)
    export let value = ''; // Bound value for the input
    export let placeholder = '';
    export let isTextArea = false;// Placeholder text

    function handleInput(event) {
        value = event.target.value;
    }

    function handleTextareaInput(event) {
        const target = event.target;
        target.style.height = 'auto'; // Reset height
        target.style.height = `${target.scrollHeight + 2}px`; // Adjust height based on content
        value = target.value;
    }
</script>

<div class="form-group">
    {#if isTextArea}
        <textarea
                class="form-control textarea-autogrow"
                placeholder={placeholder}
                bind:value={value}
                on:input={handleTextareaInput}
                required></textarea>
    {:else}
        <input
                type={type}
                class="form-control"
                placeholder={placeholder}
                value={value}
                on:input={handleInput}
                required />
    {/if}
</div>

<style>
    .form-group {
        margin-bottom: 20px;
    }


    .form-control {
        width: 100%;
        padding: 15px;
        border-radius: 50px; /* Rounded input field */
        border: none;
        background-color: #f6f6f6;
        font-size: 16px;
        text-align: center;
    }

    .form-control::placeholder {
        color: #999; /* Placeholder text color */
        font-size: 16px;
    }

    .form-control:focus {
        outline: none;
    }

    .form-control.textarea-autogrow {
        text-align: left;
        border-radius: 20px;
        resize: none;
        width: 100%;
        padding: 15px;
        border: none;
        background-color: #f6f6f6;
        font-size: 16px;
        font-family: inherit; /* Ensure the font family is consistent */
        line-height: 1.5; /* Match line-height for consistent appearance */
        color: inherit; /* Inherit the color from parent or other form fields */
    }




</style>
