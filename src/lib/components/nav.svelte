<script lang="ts">
    import { faBars, faUserAlt } from "@fortawesome/free-solid-svg-icons";
    import { onMount } from "svelte";
    import Fa from "svelte-fa";
    import Logo from "$lib/components/logo.svelte";
    import Terminal from "./terminal.svelte";

    let open = $state(false);

    let nav = $state<HTMLElement | null>(null);

    onMount(() => {
        window.addEventListener("click", (e) => {
            if (!nav?.contains(e.target as Node) && open) {
                open = false;
            }
        });
    });
</script>

<nav bind:this={nav} class:open>
    <ul class="mobile-only">
        <li><a onclick={() => (open = false)} href="/">Home</a></li>
        <li><a onclick={() => (open = false)} href="/timeline">Timeline</a></li>
        <li><a onclick={() => (open = false)} href="/notes">Notes</a></li>
        <li>
            <a onclick={() => (open = false)} href="/account">
                <div class="icon">
                    <Fa icon={faUserAlt} size="lg" fw />
                </div>
            </a>
        </li>
    </ul>
    <!-- <div class="terminal"> -->
    <Terminal />
    <!-- </div> -->
    <div class="links">
        <Logo />
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/timeline">Timeline</a></li>
            <li><a href="/notes">Notes</a></li>
        </ul>
        <button aria-label="open menu" onclick={() => (open = !open)}>
            <div class="icon">
                <Fa icon={faBars} size="lg" fw />
            </div>
        </button>
        <div class="icon dektop-only">
            <Fa icon={faUserAlt} size="lg" fw />
        </div>
    </div>
</nav>

<style lang="scss">
    @use "$lib/scss/var";
    @use "$lib/scss/mixins";

    .open {
        top: calc(0);

        &:hover {
            top: calc(0);
        }
    }

    nav {
        @include mixins.box($use-padding: false);
        position: absolute;
        height: 80vh;
        width: calc(100vw - var.$gap * 6);
        top: calc(-1 * (80vh - var.$gap * 4));
        left: calc(var.$gap * 2);
        display: flex;
        flex-direction: column;

        @media (max-width: var.$mobile-width) {
            width: calc(100vw - var.$gap * 2);
            left: 0;
        }

        transition: all 0.3s ease-out !important;

        // Mobile nav links
        .mobile-only {
            display: none;

            @media (max-width: var.$mobile-width) {
                display: flex;
            }
        }

        // Desktop nav links
        .links {
            padding: var.$gap;
            display: flex;
            flex-direction: row;
            height: calc(var.$gap * 5);

            // Menu styling override for desktop
            ul {
                padding: 0 0 0 20px;
                flex-direction: row;

                a {
                    font-size: larger;
                }
            }

            button {
                cursor: pointer;
                flex: 1;
                margin: -10px 0;
                height: calc(100% + 20px);
                border: none;
                background: transparent;
                display: flex;
                flex-direction: row-reverse;

                .icon {
                    @media not (max-width: var.$mobile-width) {
                        display: none;
                    }
                }
            }

            // Hide the account button on mobile
            .dektop-only {
                display: none;

                @media not (max-width: var.$mobile-width) {
                    display: flex;
                }
            }
        }

        // Nav bar move on hover
        @media not (max-width: var.$mobile-width) {
            &:hover {
                top: calc(-1 * (80vh - var.$gap * 4) + 4px);
            }
        }
    }

    // Mobile menu styling
    ul {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: var.$gap 0 var.$gap calc(var.$gap * 2);

        .icon {
            margin: var.$gap 0;
        }

        @media (max-width: var.$mobile-width) {
            display: none;
        }

        li {
            list-style: none;
            display: flex;

            a {
                padding: 0 15px 0 5px;
                text-decoration: none;
                font-weight: bold;
                text-align: center;
                font-size: 2.5em;

                transition: color 0.3s;

                &:hover {
                    color: var.$primary;
                }
            }
        }
    }

    .icon {
        margin: auto 0;

        &:hover {
            cursor: pointer;
            :global(path) {
                color: var.$primary !important;
            }
        }
    }
</style>
