<script lang="ts">
    import { faUser } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
</script>

<nav>
    <div>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
        <Fa icon={faUser} />
    </div>
</nav>

<style lang="scss">
    @use "$lib/scss/var";
    @use "$lib/scss/mixins";

    nav {
        @include mixins.box;
        height: 80vh;
        width: calc(100vw - var.$gap * 6);
        position: absolute;
        bottom: calc(100vh - var.$gap * 6);
        left: calc(var.$gap * 2);

        display: flex;
        flex-direction: column-reverse;

        div {
            margin-top: auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            ul {
                display: flex;
                flex-direction: row;
                margin: 0;

                li {
                    margin-right: 30px;
                    list-style: none;

                    a {
                        text-decoration: none;
                    }
                }
            }
        }
    }
</style>
