<script>
    import Field from "../components/Field.svelte";
    import {setAuth} from "../stores/tokenStore.js";
    import router from 'page';

    let errorMessage = '';

    let isLogin = false; // Toggle between login and registration
    let email = '';
    let password = '';
    let password_confirmation = '';

    function toggleForm() {
        isLogin = !isLogin;
        resetFields();
    }

    function resetFields() {
        email = '';
        password = '';
        password_confirmation = '';
    }

    function validateEmail(email) {

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);

    }
    function validatePasswordLength(password) {
        return password.length >= 8; // Password must be at least 8 characters
    }


    async function handleSubmit() {
        let url = isLogin ? 'http://localhost:3000/tokens' : 'http://localhost:3000/users'; // Explicit URL for testing// Decide URL based on login or registration

        let body = {
            email,
            password,
        };
        if (!email || !password || (!isLogin && !password_confirmation)) {
            return alert('All fields should be filled!');
        }
        if (!validateEmail(email)) {
            return alert('Invalid email address!');
        }
        if (!validatePasswordLength(password)) {
            return alert('Password must be at least 8 characters long!');
        }

        if(!isLogin &&password!==password_confirmation) {
            return alert('Passwords do not match!');
        }
        if (!isLogin) {
            body.password_confirmation = password_confirmation;
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to authenticate');
            }

            // After successful authentication, update the auth store
            setAuth(data.token, data.user);


            alert(isLogin ? 'Login successful!' : 'Registration successful!');
            router('/'); // Redirect to homepage or the desired route




        } catch (error) {
            alert(error.message || 'An error occurred during the authentication process');
        }

    }
</script>


<div class="container">
    <!-- Conditional rendering based on isLogin -->
    <h2 class="title text-center">{isLogin ? 'Login into your account' : 'Create your account'}</h2>

    <form class="form-style form-style-minimal mt-30px mb-30px" on:submit|preventDefault={handleSubmit}>
        <!-- Email Field -->

        <Field
                type="email"
                placeholder="Email"
                bind:value={email}
        />

        <!-- Password Field -->
        <Field
                type="password"
                placeholder="Password"
                bind:value={password}
        />

        {#if !isLogin}
            <!-- Password Confirmation Field (only in registration) -->
            <Field
                    type="password"
                    placeholder="Confirm Password"
                    bind:value={password_confirmation}
            />
        {/if}

        <button type="submit" class="auth-button btn btn-black">{isLogin ? 'Login' : 'Register'}</button>
    </form>

    <!-- Toggle Links -->
    <p class="toggle-text">
        {#if isLogin}
            Not registered yet?
            <button class="text-button" type="button" on:click={toggleForm}>Register</button>
        {:else}
            Already registered?
            <button class="text-button" type="button" on:click={toggleForm}>Login</button>
        {/if}
    </p>

</div>
<style>


    .container {
        margin-top: 60px;
        width: 100%;
        max-width: 1210px;


    }

    .title {
        font-size: 30px;

    }

    .auth-button {
        margin-left: 15px
    }

    .text-button {
        background: none;
        border: none;
        color: #007bff;
        font: inherit;

        cursor: pointer;
    }


    .toggle-text {
        justify-content: center;
        text-align: center;
        margin-top: 20px;
        font-size: 18px;
        margin-bottom: 30px;
    }


    @media (max-width: 768px) {
        .form-style {
            width: 100%;
            max-width: 80%;
            padding: 10px;
        }

        .title {
            font-size: 24px;

        }

        .toggle-text {
            font-size: 16px;
            margin-bottom: 20px;
        }
    }

    @media (max-width: 480px) {
        .title {
            font-size: 20px;
        }

        .form-style {
            width: 100%;
            max-width: 70%; /* Ensure full width on small screens */
        }

        .toggle-text {
            font-size: 14px;
        }
    }
</style>
