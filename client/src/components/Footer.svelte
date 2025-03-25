<footer>
    <div class="footer">
        <div class="container">
            <div class="footer__wrapper">
                <div class="footer-center">
                    <img src="/logo.png" alt="ArtBidder Logo" class="footer-logo"/>
                    <p class="website-name">ArtBidder</p>
                    <p class="website-description">
                        Discover exclusive paintings, explore various artists, and place bids in real-time with a
                        seamless and secure auction experience on ArtBidder.
                    </p>
                    <p class="footer-copyright">© 2024 ArtBidder. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    </div>
</footer>

<style>
    .footer {
        background-color: #222;
        color: white;

        text-align: center;
        width: 100%; /* Full width */
        box-sizing: border-box; /* Include padding in width */
        margin: 0 0;
        position: relative;
    }

    .container {
        max-width: 1210px;
        margin: 0 auto;
        padding: 0 15px; /* Ensure content doesn’t touch edges */
    }

    .footer__wrapper {
        padding: 40px 0;
        width: 100%; /* Full width */
    }

    .footer-center {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
    }

    .footer-logo {
        width: 60px;
        margin-bottom: 10px;
    }

    .website-name {
        font-size: 24px;
        font-weight: bold;
    }

    .website-description {
        font-size: 14px;
        color: #ccc;
        max-width: 600px;
    }

    .footer-copyright {
        font-size: 14px;
        color: #ccc;
        margin-top: 20px;
    }

    @media (max-width: 768px) {
        .footer-logo {
            width: 50px;
        }

        .website-name {
            font-size: 20px;
        }

        .website-description {
            font-size: 13px;
        }
    }
</style>
